<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center p-4">
    <div class="max-w-md w-full">
      <!-- Logo y Título -->
      <div class="text-center mb-8">
        <div class="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Consultorio Virtual
        </h1>
        <p class="text-gray-600">Inicia sesión con tu cuenta</p>
      </div>

      <!-- Formulario de Login -->
      <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Campo Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="tu@email.com"
              :disabled="authStore.cargando"
            />
          </div>

          <!-- Campo Contraseña -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="••••••••"
              :disabled="authStore.cargando"
            />
          </div>

          <!-- Botón de Login -->
          <button
            type="submit"
            :disabled="authStore.cargando"
            class="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 focus:ring-4 focus:ring-purple-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div v-if="authStore.cargando" class="flex items-center justify-center space-x-2">
              <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Iniciando sesión...</span>
            </div>
            <span v-else>Iniciar Sesión</span>
          </button>

          <!-- Error -->
          <div v-if="authStore.error" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-red-800 text-sm">{{ authStore.error }}</span>
            </div>
          </div>
        </form>

        <!-- Información de Roles -->
        <div class="mt-8 pt-6 border-t border-gray-200">
          <h3 class="text-sm font-medium text-gray-700 mb-3">Acceso por Roles:</h3>
          <div class="space-y-2 text-xs text-gray-600">
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span><strong>Psicóloga:</strong> diana@consultorio.com</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span><strong>Administrador:</strong> admin@consultorio.com</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <span><strong>Paciente:</strong> paciente@consultorio.com</span>
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-3">
            <strong>Contraseña:</strong> Cualquier contraseña (demo)
          </p>
        </div>

        <!-- Botón Volver -->
        <div class="mt-6 text-center">
          <router-link
            to="/"
            class="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors duration-200"
          >
            ← Volver al Inicio
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Formulario
const form = ref({
  email: '',
  password: ''
})

// Manejar login
const handleLogin = async () => {
  try {
    const usuario = await authStore.iniciarSesion(form.value.email, form.value.password)

    // Redirigir según el rol
    if (usuario.rol === 'psicologo') {
      router.push('/dashboard-psicologa')
    } else if (usuario.rol === 'admin') {
      router.push('/dashboard-admin')
    } else {
      router.push('/menu-principal')
    }
  } catch (error) {
    console.error('Error en login:', error)
  }
}

// Limpiar error al cambiar campos
const limpiarError = () => {
  if (authStore.error) {
    authStore.error = null
  }
}

// Observar cambios en el formulario
onMounted(() => {
  // Limpiar error cuando se monta el componente
  if (authStore.error) {
    authStore.error = null
  }
})
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
