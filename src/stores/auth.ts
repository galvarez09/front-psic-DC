import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Usuario {
  id: number
  nombre: string
  email: string
  rol: 'paciente' | 'psicologo' | 'admin'
  especialidad?: string
  activo: boolean
}

export interface Sesion {
  usuario: Usuario
  token: string
  expira: Date
}

export const useAuthStore = defineStore('auth', () => {
  // Estado
  const sesion = ref<Sesion | null>(null)
  const cargando = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const estaAutenticado = computed(() => sesion.value !== null)
  const usuarioActual = computed(() => sesion.value?.usuario || null)
  const rolUsuario = computed(() => sesion.value?.usuario.rol || null)

  const esPaciente = computed(() => rolUsuario.value === 'paciente')
  const esPsicologo = computed(() => rolUsuario.value === 'psicologo')
  const esAdmin = computed(() => rolUsuario.value === 'admin')

  // Acciones
  const iniciarSesion = async (email: string, password: string) => {
    cargando.value = true
    error.value = null

    try {
      // Simulación de API - En producción esto sería una llamada real
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Simular diferentes usuarios según el email
      let usuario: Usuario

      if (email.includes('diana') || email.includes('psicologo')) {
        usuario = {
          id: 1,
          nombre: 'Psic. Diana Campos',
          email: email,
          rol: 'psicologo',
          especialidad: 'Psicología Clínica',
          activo: true
        }
      } else if (email.includes('admin') || email.includes('administrador')) {
        usuario = {
          id: 2,
          nombre: 'Administrador del Sistema',
          email: email,
          rol: 'admin',
          activo: true
        }
      } else {
        usuario = {
          id: 3,
          nombre: 'Paciente Demo',
          email: email,
          rol: 'paciente',
          activo: true
        }
      }

      // Crear sesión simulada
      const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const expira = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 horas

      sesion.value = {
        usuario,
        token,
        expira
      }

      // Guardar en localStorage
      localStorage.setItem('sesion', JSON.stringify(sesion.value))

      return usuario
    } catch (err) {
      error.value = 'Error al iniciar sesión'
      throw err
    } finally {
      cargando.value = false
    }
  }

  const cerrarSesion = () => {
    sesion.value = null
    localStorage.removeItem('sesion')
  }

  const verificarSesion = () => {
    const sesionGuardada = localStorage.getItem('sesion')
    if (sesionGuardada) {
      try {
        const sesionData = JSON.parse(sesionGuardada)
        const expira = new Date(sesionData.expira)

        if (expira > new Date()) {
          sesion.value = sesionData
        } else {
          localStorage.removeItem('sesion')
        }
      } catch (err) {
        localStorage.removeItem('sesion')
      }
    }
  }

  const renovarSesion = () => {
    if (sesion.value) {
      const nuevaExpira = new Date(Date.now() + 24 * 60 * 60 * 1000)
      sesion.value.expira = nuevaExpira
      localStorage.setItem('sesion', JSON.stringify(sesion.value))
    }
  }

  // Inicializar sesión al cargar el store
  verificarSesion()

  return {
    // Estado
    sesion,
    cargando,
    error,

    // Getters
    estaAutenticado,
    usuarioActual,
    rolUsuario,
    esPaciente,
    esPsicologo,
    esAdmin,

    // Acciones
    iniciarSesion,
    cerrarSesion,
    verificarSesion,
    renovarSesion
  }
})
