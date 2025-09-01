import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth'
import { auth, googleProvider } from '@/firebase/config'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'

export interface UserProfile {
  uid: string
  email: string
  displayName: string
  photoURL: string
  role: 'paciente' | 'psicologa' | 'admin'
  createdAt: Date
  lastLogin: Date
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const userProfile = ref<UserProfile | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Computed properties
  const isAuthenticated = computed(() => !!user.value)
  const isPaciente = computed(() => userProfile.value?.role === 'paciente')
  const isPsicologa = computed(() => userProfile.value?.role === 'psicologa')
  const isAdmin = computed(() => userProfile.value?.role === 'admin')

  // Inicializar el estado de autenticación
  const initAuth = () => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      user.value = firebaseUser
      if (firebaseUser) {
        await loadUserProfile(firebaseUser.uid)
      } else {
        userProfile.value = null
      }
    })
  }

  // Cargar perfil del usuario desde Firestore
  const loadUserProfile = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      if (userDoc.exists()) {
        userProfile.value = userDoc.data() as UserProfile
      }
    } catch (err) {
      console.error('Error loading user profile:', err)
    }
  }

  // Crear o actualizar perfil del usuario
  const createUserProfile = async (firebaseUser: User, role: 'paciente' | 'psicologa' | 'admin' = 'paciente', displayName?: string) => {
    const userData: UserProfile = {
      uid: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: displayName || firebaseUser.displayName || '',
      photoURL: firebaseUser.photoURL || '',
      role,
      createdAt: new Date(),
      lastLogin: new Date()
    }

    try {
      await setDoc(doc(db, 'users', firebaseUser.uid), userData)
      userProfile.value = userData
    } catch (err) {
      console.error('Error creating user profile:', err)
      throw err
    }
  }

  // Iniciar sesión con Google
  const signInWithGoogle = async (role: 'paciente' | 'psicologa' | 'admin' = 'paciente') => {
    loading.value = true
    error.value = null

    try {
      const result = await signInWithPopup(auth, googleProvider)
      const firebaseUser = result.user

      // Verificar si el usuario ya existe
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))

      if (!userDoc.exists()) {
        // Usuario nuevo - crear perfil
        await createUserProfile(firebaseUser, role)
      } else {
        // Usuario existente - actualizar último login
        await loadUserProfile(firebaseUser.uid)
        await setDoc(doc(db, 'users', firebaseUser.uid), {
          lastLogin: new Date()
        }, { merge: true })
      }

      return result
    } catch (err: any) {
      error.value = err.message || 'Error al iniciar sesión'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Registrar con email y contraseña
  const registerWithEmail = async (email: string, password: string, displayName: string, role: 'paciente' | 'psicologa' | 'admin' = 'paciente') => {
    loading.value = true
    error.value = null

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      const firebaseUser = result.user

      // Actualizar displayName en Firebase Auth
      await firebaseUser.updateProfile({
        displayName: displayName
      })

      // Crear perfil en Firestore
      await createUserProfile(firebaseUser, role, displayName)

      return result
    } catch (err: any) {
      error.value = err.message || 'Error al crear la cuenta'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Iniciar sesión con email y contraseña
  const signInWithEmail = async (email: string, password: string) => {
    loading.value = true
    error.value = null

    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      const firebaseUser = result.user

      // Cargar perfil del usuario
      await loadUserProfile(firebaseUser.uid)

      // Actualizar último login
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        lastLogin: new Date()
      }, { merge: true })

      return result
    } catch (err: any) {
      error.value = err.message || 'Error al iniciar sesión'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Cerrar sesión
  const logout = async () => {
    loading.value = true
    try {
      await signOut(auth)
      user.value = null
      userProfile.value = null
    } catch (err: any) {
      error.value = err.message || 'Error al cerrar sesión'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Limpiar error
  const clearError = () => {
    error.value = null
  }

  return {
    // State
    user,
    userProfile,
    loading,
    error,

    // Computed
    isAuthenticated,
    isPaciente,
    isPsicologa,
    isAdmin,

    // Actions
    initAuth,
    signInWithGoogle,
    registerWithEmail,
    signInWithEmail,
    logout,
    clearError
  }
})
