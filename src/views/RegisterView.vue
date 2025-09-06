<template>
  <div
    class="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <!-- Fondo decorativo -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-sky-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"
      ></div>
      <div
        class="absolute top-40 left-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"
      ></div>
    </div>

    <div class="relative max-w-md w-full space-y-8">
      <!-- Logo y título -->
      <div class="text-center">
        <div class="flex justify-center mb-6">
          <div
            class="w-16 h-16 bg-gradient-to-br from-blue-600 to-sky-500 rounded-2xl flex items-center justify-center shadow-lg"
          >
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Crear cuenta</h2>
        <p class="text-gray-600">Únete al consultorio virtual de la Psicóloga Diana Campos</p>
      </div>

      <!-- Selector de método de registro -->
      <div class="bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <!-- Tabs de registro -->
        <div class="flex space-x-1 bg-gray-100 p-1 rounded-xl">
          <button
            @click="authMethod = 'email'"
            class="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200"
            :class="authMethod === 'email' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'"
          >
            Email y Contraseña
          </button>
          <button
            @click="authMethod = 'google'"
            class="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200"
            :class="authMethod === 'google' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'"
          >
            Con Google
          </button>
        </div>

        <!-- Formulario de email y contraseña -->
        <div v-if="authMethod === 'email'" class="space-y-4">
          <!-- Nombre completo -->
          <div>
            <label for="fullName" class="block text-sm font-medium text-gray-700 mb-2">
              Nombre completo
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                id="fullName"
                v-model="form.fullName"
                type="text"
                required
                class="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm transition-all duration-200"
                placeholder="Tu nombre completo"
              />
            </div>
          </div>

          <!-- Campo de email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm transition-all duration-200"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <!-- Campo de contraseña -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="appearance-none relative block w-full pl-10 pr-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm transition-all duration-200"
                placeholder="Mínimo 6 caracteres"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  v-if="showPassword"
                  class="h-5 w-5 text-gray-400 hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
                <svg
                  v-else
                  class="h-5 w-5 text-gray-400 hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Confirmar contraseña -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
              Confirmar contraseña
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                class="appearance-none relative block w-full pl-10 pr-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm transition-all duration-200"
                placeholder="Repite tu contraseña"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  v-if="showConfirmPassword"
                  class="h-5 w-5 text-gray-400 hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
                <svg
                  v-else
                  class="h-5 w-5 text-gray-400 hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Selector de rol -->
          <div>
            <label for="role" class="block text-sm font-medium text-gray-700 mb-2">
              Tipo de usuario
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <select
                id="role"
                v-model="form.role"
                required
                class="appearance-none relative block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm transition-all duration-200"
              >
                <option value="">Selecciona tu rol</option>
                <option value="paciente">Paciente</option>
                <option value="psicologa">Psicóloga</option>
                <option value="admin">Administrador</option>
              </select>
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Términos y condiciones -->
          <div class="flex items-center">
            <input
              id="terms"
              v-model="form.acceptTerms"
              type="checkbox"
              required
              class="h-4 w-4 text-blue-600 focus:ring-sky-500 border-gray-300 rounded"
            />
            <label for="terms" class="ml-2 block text-sm text-gray-700">
              Acepto los
              <a href="#" class="font-medium text-blue-600 hover:text-sky-500 transition-colors duration-200">
                términos y condiciones
              </a>
              y la
              <a href="#" class="font-medium text-blue-600 hover:text-sky-500 transition-colors duration-200">
                política de privacidad
              </a>
            </label>
          </div>

          <!-- Botón de registro -->
          <button
            @click="handleEmailRegister"
            :disabled="loading || !form.acceptTerms || form.password !== form.confirmPassword || !form.fullName || !form.email || !form.role"
            class="group relative w-full flex justify-center items-center px-6 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg
              v-if="loading"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Creando cuenta...' : 'Crear cuenta' }}
          </button>
        </div>

        <!-- Registro con Google -->
        <div v-if="authMethod === 'google'" class="space-y-6">
          <!-- Selector de rol -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">
              Selecciona tu rol
            </label>
            <div class="grid grid-cols-1 gap-3">
              <button
                @click="selectedRole = 'paciente'"
                class="flex items-center p-4 rounded-xl border-2 transition-all duration-200"
                :class="selectedRole === 'paciente'
                  ? 'border-sky-500 bg-sky-50 text-blue-700'
                  : 'border-gray-200 hover:border-sky-300 hover:bg-green-25'"
              >
                <div class="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center mr-4">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div class="text-left">
                  <div class="font-semibold">Paciente</div>
                  <div class="text-sm text-gray-500">Accede a consultas virtuales</div>
                </div>
              </button>

              <button
                @click="selectedRole = 'psicologa'"
                class="flex items-center p-4 rounded-xl border-2 transition-all duration-200"
                :class="selectedRole === 'psicologa'
                  ? 'border-sky-500 bg-sky-50 text-blue-700'
                  : 'border-gray-200 hover:border-sky-300 hover:bg-green-25'"
              >
                <div class="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center mr-4">
                  <svg class="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div class="text-left">
                  <div class="font-semibold">Psicóloga</div>
                  <div class="text-sm text-gray-500">Gestiona consultas y pacientes</div>
                </div>
              </button>

              <button
                @click="selectedRole = 'admin'"
                class="flex items-center p-4 rounded-xl border-2 transition-all duration-200"
                :class="selectedRole === 'admin'
                  ? 'border-sky-500 bg-sky-50 text-blue-700'
                  : 'border-gray-200 hover:border-sky-300 hover:bg-green-25'"
              >
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div class="text-left">
                  <div class="font-semibold">Administrador</div>
                  <div class="text-sm text-gray-500">Gestiona el sistema completo</div>
                </div>
              </button>
            </div>
          </div>

          <!-- Botón de registro con Google -->
          <button
            @click="handleGoogleSignUp"
            :disabled="loading || !selectedRole"
            class="group relative w-full flex justify-center items-center px-6 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg
              v-if="loading"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg
              v-else
              class="w-5 h-5 mr-3"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {{ loading ? 'Creando cuenta...' : 'Registrarse con Google' }}
          </button>
        </div>

        <!-- Mensaje de error -->
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-xl p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-red-800">{{ error }}</p>
            </div>
          </div>
        </div>

        <!-- Información adicional -->
        <div class="text-center">
          <p class="text-sm text-gray-600">
            ¿Ya tienes cuenta?
            <router-link
              to="/login"
              class="font-medium text-blue-600 hover:text-sky-500 transition-colors"
            >
              Inicia sesión aquí
            </router-link>
          </p>
        </div>
      </div>

      <!-- Enlace de regreso -->
      <div class="text-center">
        <router-link
          to="/"
          class="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al inicio
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const authMethod = ref<'email' | 'google'>('email')
const selectedRole = ref<'paciente' | 'psicologa' | 'admin'>('paciente')
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const error = ref<string | null>(null)

const form = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: '',
  acceptTerms: false
})

const handleEmailRegister = async () => {
  if (!form.fullName || !form.email || !form.password || !form.confirmPassword || !form.role) {
    error.value = 'Por favor completa todos los campos'
    return
  }

  if (form.password !== form.confirmPassword) {
    error.value = 'Las contraseñas no coinciden'
    return
  }

  if (form.password.length < 6) {
    error.value = 'La contraseña debe tener al menos 6 caracteres'
    return
  }

  if (!form.acceptTerms) {
    error.value = 'Debes aceptar los términos y condiciones'
    return
  }

  loading.value = true
  error.value = null

  try {
    await authStore.registerWithEmail(form.email, form.password, form.fullName, form.role as 'paciente' | 'psicologa' | 'admin')

    // Redirigir según el rol
    switch (form.role) {
      case 'paciente':
        router.push('/dashboard')
        break
      case 'psicologa':
        router.push('/dashboard-psicologa')
        break
      case 'admin':
        router.push('/dashboard-admin')
        break
      default:
        router.push('/dashboard')
    }
  } catch (err: any) {
    error.value = err.message || 'Error al crear la cuenta'
  } finally {
    loading.value = false
  }
}

const handleGoogleSignUp = async () => {
  if (!selectedRole.value) {
    error.value = 'Por favor selecciona un rol'
    return
  }

  loading.value = true
  error.value = null

  try {
    await authStore.signInWithGoogle(selectedRole.value)

    // Redirigir según el rol
    switch (selectedRole.value) {
      case 'paciente':
        router.push('/dashboard')
        break
      case 'psicologa':
        router.push('/dashboard-psicologa')
        break
      case 'admin':
        router.push('/dashboard-admin')
        break
    }
  } catch (err: any) {
    error.value = err.message || 'Error al crear la cuenta'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}
</style>
