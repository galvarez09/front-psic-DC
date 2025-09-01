<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
    <!-- Navegación del Dashboard -->
    <nav class="bg-white shadow-lg border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="flex items-center space-x-3">
                <div
                  class="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 class="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Mi Consultorio Virtual
                  </h1>
                  <p class="text-xs text-gray-500">Panel de Paciente</p>
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <!-- Notificaciones -->
            <button class="relative p-2 text-gray-600 hover:text-purple-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span v-if="notifications.length > 0" class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {{ notifications.length }}
              </span>
            </button>

            <!-- Perfil del usuario -->
            <div class="flex items-center space-x-3">
              <img
                v-if="userProfile?.photoURL"
                :src="userProfile.photoURL"
                :alt="userProfile.displayName"
                class="w-8 h-8 rounded-full"
              />
              <div v-else class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div class="hidden md:block">
                <p class="text-sm font-medium text-gray-700">{{ userProfile?.displayName || 'Usuario' }}</p>
                <p class="text-xs text-gray-500">{{ userProfile?.email }}</p>
              </div>
            </div>

            <button
              @click="logout"
              class="text-gray-700 hover:text-red-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-red-50"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Contenido del Dashboard -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header con estadísticas -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">¡Bienvenido, {{ userProfile?.displayName?.split(' ')[0] || 'Usuario' }}!</h2>
            <p class="text-gray-600 mt-1">Gestiona tus consultas virtuales y tu bienestar mental</p>
          </div>
          <div class="mt-4 md:mt-0">
            <router-link
              to="/"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al inicio
            </router-link>
          </div>
        </div>

        <!-- Estadísticas rápidas -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-500">Consultas Completadas</p>
                <p class="text-lg font-semibold text-gray-900">{{ stats.completedSessions }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4m-4 6v6m-4-6h8m-8 0H4" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-500">Próxima Cita</p>
                <p class="text-lg font-semibold text-gray-900">{{ stats.nextSession || 'Sin programar' }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-500">Tiempo Total</p>
                <p class="text-lg font-semibold text-gray-900">{{ stats.totalHours }}h</p>
              </div>
            </div>
          </div>

          <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-500">Estado</p>
                <p class="text-lg font-semibold text-green-600">Activo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Acciones principales -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <!-- Agendar nueva cita -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Agendar Cita</h3>
              <p class="text-sm text-gray-500">Programa tu próxima sesión</p>
            </div>
          </div>
          <button class="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 px-4 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium">
            Agendar Ahora
          </button>
        </div>

        <!-- Unirse a consulta -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Unirse a Consulta</h3>
              <p class="text-sm text-gray-500">Accede a tu sesión virtual</p>
            </div>
          </div>
          <button class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium">
            Unirse Ahora
          </button>
        </div>

        <!-- Historial de sesiones -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Historial</h3>
              <p class="text-sm text-gray-500">Revisa tus sesiones anteriores</p>
            </div>
          </div>
          <button class="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium">
            Ver Historial
          </button>
        </div>
      </div>

      <!-- Próximas consultas -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Próximas Consultas</h3>
          <button class="text-purple-600 hover:text-purple-700 text-sm font-medium">Ver todas</button>
        </div>

        <div v-if="upcomingSessions.length === 0" class="text-center py-8">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4m-4 6v6m-4-6h8m-8 0H4" />
            </svg>
          </div>
          <p class="text-gray-500 mb-2">No tienes consultas programadas</p>
          <button class="text-purple-600 hover:text-purple-700 font-medium">Agendar tu primera cita</button>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="session in upcomingSessions"
            :key="session.id"
            class="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4 flex-1">
              <h4 class="font-medium text-gray-900">{{ session.title }}</h4>
              <p class="text-sm text-gray-500">{{ session.date }} - {{ session.time }}</p>
            </div>
            <button class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
              Unirse
            </button>
          </div>
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

// Datos del usuario
const userProfile = ref(authStore.userProfile)

// Notificaciones
const notifications = ref([
  { id: 1, message: 'Tu cita de mañana ha sido confirmada', read: false },
  { id: 2, message: 'Nuevo mensaje de tu psicóloga', read: false }
])

// Estadísticas
const stats = ref({
  completedSessions: 12,
  nextSession: 'Mañana 10:00 AM',
  totalHours: 24
})

// Próximas consultas
const upcomingSessions = ref([
  {
    id: 1,
    title: 'Sesión de Terapia - Psic. Diana Campos',
    date: 'Mañana',
    time: '10:00 AM'
  }
])

const logout = async () => {
  try {
    await authStore.logout()
    router.push('/')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}

onMounted(() => {
  // Inicializar datos si es necesario
  if (!authStore.isAuthenticated) {
    router.push('/login')
  }
})
</script>
