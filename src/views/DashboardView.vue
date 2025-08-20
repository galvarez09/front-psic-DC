<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
    <!-- Navegación del Dashboard -->
    <nav class="bg-white shadow-lg">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h1
                  class="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                >
                  Dashboard
                </h1>
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <button
              @click="logout"
              class="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Contenido del Dashboard -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center">
        <div
          class="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-4">¡Bienvenido al Dashboard!</h2>
        <p class="text-xl text-gray-600 mb-8">
          Has iniciado sesión exitosamente en el consultorio virtual
        </p>

        <div class="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div
              class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto"
            >
              <svg
                class="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3a4 4 0 118 0v4m-4 6v6m-4-6h8m-8 0H4"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Agendar Cita</h3>
            <p class="text-gray-600">Programa tu próxima sesión con la psicóloga</p>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div
              class="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4 mx-auto"
            >
              <svg
                class="w-6 h-6 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Mis Sesiones</h3>
            <p class="text-gray-600">Revisa el historial de tus consultas</p>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div
              class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto"
            >
              <svg
                class="w-6 h-6 text-blue-600"
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
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Mi Perfil</h3>
            <p class="text-gray-600">Actualiza tu información personal</p>
          </div>
        </div>

        <div class="mt-12">
          <router-link
            to="/"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-purple-600 bg-white hover:bg-gray-50 shadow-lg transition-all duration-200"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver al inicio
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  // Aquí iría la lógica de cierre de sesión
  console.log('Cerrando sesión...')
  router.push('/')
}
</script>
