<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navegación Superior -->
    <nav class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div class="flex justify-between items-center h-14 sm:h-16">
          <!-- Logo y Título -->
          <div class="flex items-center space-x-2 sm:space-x-3">
            <div class="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-600 to-sky-500 rounded-lg flex items-center justify-center shadow-lg">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <h1 class="text-sm sm:text-lg font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                Psic. Diana Campos
              </h1>
              <p class="text-xs text-gray-500 hidden sm:block">Panel Profesional</p>
            </div>
          </div>

          <!-- Botones de Acción -->
          <div class="flex items-center space-x-2 sm:space-x-4">
            <!-- Notificaciones -->
            <button
              @click="mostrarNotificaciones"
              class="relative p-1.5 sm:p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span v-if="notificaciones.length > 0" class="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {{ notificaciones.length }}
              </span>
            </button>

            <!-- Botón Volver al Inicio -->
            <router-link
              to="/"
              class="px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-700 hover:text-blue-600 transition-colors duration-300 border border-gray-300 rounded-lg hover:bg-gray-50 sm:border-none sm:rounded-none sm:hover:bg-transparent"
            >
              <span class="hidden sm:inline">Volver al Inicio</span>
              <span class="sm:hidden">Inicio</span>
            </router-link>

            <!-- Botón Cerrar Sesión -->
            <button
              @click="cerrarSesion"
              class="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 font-medium"
            >
              <span class="hidden sm:inline">Cerrar Sesión</span>
              <span class="sm:hidden">Salir</span>
            </button>

            <!-- Menú hamburguesa para móviles -->
            <button
              @click="toggleMenuMobile"
              class="lg:hidden p-1.5 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Menú móvil desplegable -->
        <div v-if="menuMobileVisible" class="lg:hidden border-t border-gray-200 bg-white">
          <div class="px-3 py-4 space-y-3">
            <!-- Notificaciones móviles -->
            <button
              @click="mostrarNotificaciones"
              class="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span class="font-medium">Notificaciones</span>
              <span v-if="notificaciones.length > 0" class="ml-auto w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {{ notificaciones.length }}
              </span>
            </button>

            <!-- Separador -->
            <div class="border-t border-gray-200 my-2"></div>

            <!-- Acceso rápido a secciones del dashboard -->
            <div class="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 py-1">
              Panel Profesional
            </div>

            <button
              @click="cambiarVista('dashboard')"
              class="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5v4m4-4v4m4-4v4M8 13v4m4-4v4m4-4v4"></path></svg>
              <span>Dashboard</span>
            </button>

            <button
              @click="cambiarVista('pacientes')"
              class="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              <span>Mis Pacientes</span>
            </button>

            <button
              @click="cambiarVista('citas')"
              class="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <span>Gestionar Citas</span>
            </button>

            <button
              @click="cambiarVista('sesiones')"
              class="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              <span>Historial Sesiones</span>
            </button>

            <button
              @click="cambiarVista('perfil')"
              class="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              <span>Mi Perfil</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="flex flex-col lg:flex-row">
      <!-- Sidebar -->
      <aside class="w-full lg:w-64 bg-white shadow-lg min-h-screen lg:min-h-screen order-2 lg:order-1">
        <div class="p-4 lg:p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-6 hidden lg:block">Panel Profesional</h2>

          <!-- Botón móvil para mostrar/ocultar sidebar -->
          <div class="lg:hidden mb-4">
            <button
              @click="toggleSidebar"
              class="w-full flex items-center justify-between px-4 py-3 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <span class="font-medium">Menú</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7 7" />
              </svg>
            </button>
          </div>

          <nav class="space-y-2" :class="sidebarVisible ? 'block' : 'hidden lg:block'">
            <button
              v-for="item in menuItems"
              :key="item.id"
              @click="cambiarVista(item.vista)"
              class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left"
              :class="vistaActiva === item.vista ? 'bg-sky-50 text-blue-700 border-r-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
            >
              <!-- Iconos del sidebar -->
              <svg v-if="item.vista === 'dashboard'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5v4m4-4v4m4-4v4M8 13v4m4-4v4m4-4v4"></path></svg>
              <svg v-else-if="item.vista === 'pacientes'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              <svg v-else-if="item.vista === 'citas'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <svg v-else-if="item.vista === 'sesiones'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              <svg v-else-if="item.vista === 'perfil'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span class="font-medium">{{ item.nombre }}</span>
            </button>
          </nav>
        </div>
      </aside>

      <!-- Contenido Principal -->
      <main class="flex-1 p-4 lg:p-8 order-1 lg:order-2">
        <!-- Vista: Dashboard Principal -->
        <div v-if="vistaActiva === 'dashboard'" class="space-y-8">
          <div class="flex justify-between items-center">
            <h1 class="text-3xl font-bold text-gray-900">Dashboard Profesional</h1>
            <div class="flex space-x-3">
              <button
                @click="mostrarModalNuevaCita"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center space-x-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Nueva Cita</span>
              </button>
              <button
                @click="mostrarModalNuevoPaciente"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center space-x-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Nuevo Paciente</span>
              </button>
            </div>
          </div>

          <!-- Estadísticas Rápidas -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Citas Hoy</p>
                  <p class="text-2xl font-bold text-gray-900">{{ estadisticas.citasHoy }}</p>
                </div>
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Pacientes Activos</p>
                  <p class="text-2xl font-bold text-gray-900">{{ estadisticas.pacientesActivos }}</p>
                </div>
                <div class="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Sesiones Este Mes</p>
                  <p class="text-2xl font-bold text-gray-900">{{ estadisticas.sesionesMes }}</p>
                </div>
                <div class="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Ingresos Mes</p>
                  <p class="text-2xl font-bold text-gray-900">{{ estadisticas.ingresosMes }}</p>
                </div>
                <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Próximas Citas -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100">
            <div class="p-6 border-b border-gray-100">
              <h3 class="text-lg font-semibold text-gray-900">Próximas Citas</h3>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div v-for="cita in proximasCitas" :key="cita.id" class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg space-y-3 sm:space-y-0">
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-sky-500 to-sky-500 rounded-full flex items-center justify-center">
                      <span class="text-white font-semibold">{{ cita.iniciales }}</span>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900">{{ cita.paciente }}</h4>
                      <p class="text-sm text-gray-600">{{ cita.especialidad }}</p>
                    </div>
                  </div>
                  <div class="text-left sm:text-right">
                    <p class="font-semibold text-gray-900">{{ cita.fecha }}</p>
                    <p class="text-sm text-gray-600">{{ cita.hora }}</p>
                  </div>
                  <div class="flex space-x-2 w-full sm:w-auto">
                    <button class="flex-1 sm:flex-none px-3 py-2 bg-sky-100 text-blue-800 rounded-lg text-sm font-medium hover:bg-sky-200 transition-colors">
                      Iniciar Sesión
                    </button>
                    <button class="flex-1 sm:flex-none px-3 py-2 bg-red-100 text-red-800 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Otras vistas se implementarán aquí -->
        <div v-if="vistaActiva === 'pacientes'" class="space-y-8">
          <h1 class="text-3xl font-bold text-gray-900">Gestión de Pacientes</h1>
          <p class="text-gray-600">Vista para gestionar pacientes (en desarrollo)</p>
        </div>

        <div v-if="vistaActiva === 'citas'" class="space-y-8">
          <h1 class="text-3xl font-bold text-gray-900">Gestión de Citas</h1>
          <p class="text-gray-600">Vista para gestionar citas (en desarrollo)</p>
        </div>

        <div v-if="vistaActiva === 'sesiones'" class="space-y-8">
          <h1 class="text-3xl font-bold text-gray-900">Historial de Sesiones</h1>
          <p class="text-gray-600">Vista para historial de sesiones (en desarrollo)</p>
        </div>

        <div v-if="vistaActiva === 'perfil'" class="space-y-8">
          <h1 class="text-3xl font-bold text-gray-900">Mi Perfil Profesional</h1>
          <p class="text-gray-600">Vista para perfil profesional (en desarrollo)</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Estados de la vista
const vistaActiva = ref('dashboard')
const sidebarVisible = ref(false)
const menuMobileVisible = ref(false)

// Menú de navegación
const menuItems = ref([
  {
    id: 1,
    nombre: 'Dashboard',
    vista: 'dashboard'
  },
  {
    id: 2,
    nombre: 'Mis Pacientes',
    vista: 'pacientes'
  },
  {
    id: 3,
    nombre: 'Gestionar Citas',
    vista: 'citas'
  },
  {
    id: 4,
    nombre: 'Historial Sesiones',
    vista: 'sesiones'
  },
  {
    id: 5,
    nombre: 'Mi Perfil',
    vista: 'perfil'
  }
])

// Estadísticas del dashboard
const estadisticas = ref({
  citasHoy: 5,
  pacientesActivos: 28,
  sesionesMes: 45,
  ingresosMes: 'S/ 3,600'
})

// Próximas citas
const proximasCitas = ref([
  {
    id: 1,
    paciente: 'María González',
    iniciales: 'MG',
    especialidad: 'Terapia Individual',
    fecha: 'Hoy',
    hora: '10:00 AM'
  },
  {
    id: 2,
    paciente: 'Carlos Ruiz',
    iniciales: 'CR',
    especialidad: 'Terapia de Pareja',
    fecha: 'Hoy',
    hora: '15:00 PM'
  },
  {
    id: 3,
    paciente: 'Ana Martínez',
    iniciales: 'AM',
    especialidad: 'Manejo del Estrés',
    fecha: 'Mañana',
    hora: '09:00 AM'
  }
])

// Notificaciones
const notificaciones = ref([
  { id: 1, mensaje: 'Nueva cita agendada para mañana' },
  { id: 2, mensaje: 'Recordatorio: Cita en 2 horas' },
  { id: 3, mensaje: 'Nuevo paciente registrado' }
])

// Funciones
const cambiarVista = (vista: string) => {
  vistaActiva.value = vista
  // En móvil, cerrar sidebar y menú móvil después de cambiar vista
  if (window.innerWidth < 1024) {
    sidebarVisible.value = false
    menuMobileVisible.value = false
  }
}

const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value
}

const toggleMenuMobile = () => {
  menuMobileVisible.value = !menuMobileVisible.value
}

const mostrarNotificaciones = () => {
  console.log('Mostrar notificaciones')
}

const mostrarModalNuevaCita = () => {
  console.log('Mostrar modal nueva cita')
}

const mostrarModalNuevoPaciente = () => {
  console.log('Mostrar modal nuevo paciente')
}

const cerrarSesion = () => {
  console.log('Cerrar sesión')
  // Aquí se implementaría la lógica de cierre de sesión
}
</script>

<style scoped>
/* Estilos adicionales para el dashboard */
</style>
