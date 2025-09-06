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
              <p class="text-xs text-gray-500 hidden sm:block">Dashboard Virtual</p>
            </div>
          </div>

          <!-- Botones de Acción -->
          <div class="flex items-center space-x-2 sm:space-x-4">
            <!-- Notificaciones - Solo visible en pantallas medianas+ -->
            <button
              @click="mostrarNotificaciones"
              class="relative p-1.5 sm:p-2 text-gray-600 hover:text-blue-600 transition-colors hidden sm:block"
            >
              <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span v-if="notificaciones.length > 0" class="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {{ notificaciones.length }}
              </span>
            </button>

            <!-- Botón Volver al Inicio - Responsive -->
            <router-link
              to="/"
              class="px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-700 hover:text-blue-600 transition-colors duration-300 border border-gray-300 rounded-lg hover:bg-gray-50 sm:border-none sm:rounded-none sm:hover:bg-transparent"
            >
              <span class="hidden sm:inline">Volver al Inicio</span>
              <span class="sm:hidden">Inicio</span>
            </router-link>

            <!-- Botón Iniciar Sesión - Responsive -->
            <router-link
              to="/login"
              class="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
            >
              <span class="hidden sm:inline">Iniciar Sesión</span>
              <span class="sm:hidden">Login</span>
            </router-link>

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
              Acceso Rápido
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
              @click="cambiarVista('mis-citas')"
              class="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <span>Mis Citas</span>
            </button>

            <button
              @click="cambiarVista('calendario')"
              class="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <span>Calendario</span>
            </button>

            <button
              @click="cambiarVista('especialidades')"
              class="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
              <span>Especialidades</span>
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
          <h2 class="text-lg font-semibold text-gray-900 mb-6 hidden lg:block">Panel de Control</h2>

          <!-- Botón móvil para mostrar/ocultar sidebar -->
          <div class="lg:hidden mb-4">
            <button
              @click="toggleSidebar"
              class="w-full flex items-center justify-between px-4 py-3 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <span class="font-medium">Menú</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
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
              <svg v-else-if="item.vista === 'mis-citas'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <svg v-else-if="item.vista === 'calendario'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <svg v-else-if="item.vista === 'especialidades'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
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
            <h1 class="text-3xl font-bold text-gray-900">Dashboard de Citas</h1>
            <button
              @click="mostrarModalAgendar"
              class="px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-500 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-sky-600 transition-all duration-300 flex items-center space-x-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Nueva Cita</span>
            </button>
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
                  <p class="text-sm font-medium text-gray-600">Citas Pendientes</p>
                  <p class="text-2xl font-bold text-gray-900">{{ estadisticas.citasPendientes }}</p>
                </div>
                <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Total Sesiones</p>
                  <p class="text-2xl font-bold text-gray-900">{{ estadisticas.totalSesiones }}</p>
                </div>
                <div class="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Próxima Cita</p>
                  <p class="text-lg font-bold text-gray-900">{{ estadisticas.proximaCita }}</p>
                </div>
                <div class="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
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
                      Confirmar
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

        <!-- Vista: Mis Citas -->
        <div v-if="vistaActiva === 'mis-citas'" class="space-y-8">
          <div class="flex justify-between items-center">
            <h1 class="text-3xl font-bold text-gray-900">Mis Citas</h1>
            <div class="flex space-x-3">
              <select v-model="filtroEstado" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                <option value="">Todos los estados</option>
                <option value="confirmada">Confirmadas</option>
                <option value="pendiente">Pendientes</option>
                <option value="cancelada">Canceladas</option>
                <option value="completada">Completadas</option>
              </select>
              <button
                @click="mostrarModalAgendar"
                class="px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-500 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-sky-600 transition-all duration-300"
              >
                Nueva Cita
              </button>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-100">
            <div class="overflow-x-auto">
              <!-- Vista móvil: Cards -->
              <div class="lg:hidden space-y-4 p-4">
                <div v-for="cita in citasFiltradas" :key="cita.id" class="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-500 rounded-full flex items-center justify-center">
                      <span class="text-white text-sm font-semibold">{{ cita.iniciales }}</span>
                    </div>
                    <div class="flex-1">
                      <h4 class="font-semibold text-gray-900">{{ cita.paciente }}</h4>
                      <p class="text-sm text-gray-500">{{ cita.email }}</p>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span class="text-gray-500">Especialidad:</span>
                      <p class="font-medium">{{ cita.especialidad }}</p>
                    </div>
                    <div>
                      <span class="text-gray-500">Fecha:</span>
                      <p class="font-medium">{{ cita.fecha }}</p>
                    </div>
                    <div>
                      <span class="text-gray-500">Hora:</span>
                      <p class="font-medium">{{ cita.hora }}</p>
                    </div>
                    <div>
                      <span class="text-gray-500">Estado:</span>
                      <span :class="getEstadoClass(cita.estado)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                        {{ cita.estado }}
                      </span>
                    </div>
                  </div>
                  <div class="flex space-x-2 pt-2">
                    <button class="flex-1 px-3 py-2 text-blue-600 hover:text-blue-900 border border-sky-300 rounded-lg hover:bg-sky-50 transition-colors">
                      Editar
                    </button>
                    <button class="flex-1 px-3 py-2 text-red-600 hover:text-red-900 border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>

              <!-- Vista desktop: Tabla -->
              <table class="w-full hidden lg:table">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especialidad</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="cita in citasFiltradas" :key="cita.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-500 rounded-full flex items-center justify-center">
                          <span class="text-white text-sm font-semibold">{{ cita.iniciales }}</span>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ cita.paciente }}</div>
                          <div class="text-sm text-gray-500">{{ cita.email }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ cita.especialidad }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ cita.fecha }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ cita.hora }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="getEstadoClass(cita.estado)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                        {{ cita.estado }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div class="flex space-x-2">
                        <button class="text-blue-600 hover:text-blue-900">Editar</button>
                        <button class="text-red-600 hover:text-red-900">Cancelar</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Vista: Calendario -->
        <div v-if="vistaActiva === 'calendario'" class="space-y-8">
          <div class="flex justify-between items-center">
            <h1 class="text-3xl font-bold text-gray-900">Calendario de Citas</h1>
            <div class="flex space-x-3">
              <button
                @click="mesAnterior"
                class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 class="text-xl font-semibold text-gray-900 px-4 py-2">{{ mesActual }}</h2>
              <button
                @click="mesSiguiente"
                class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 lg:p-6">
            <div class="grid grid-cols-7 gap-1">
              <div v-for="dia in ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']" :key="dia" class="p-2 lg:p-3 text-center text-xs lg:text-sm font-medium text-gray-500">
                {{ dia }}
              </div>
              <div
                v-for="fecha in calendario"
                :key="fecha.dia"
                class="p-2 lg:p-3 text-center border border-gray-100 min-h-[60px] lg:min-h-[80px] relative"
                :class="fecha.esHoy ? 'bg-sky-50 border-sky-200' : ''"
              >
                <span class="text-xs lg:text-sm font-medium" :class="fecha.esHoy ? 'text-blue-600' : 'text-gray-900'">
                  {{ fecha.dia }}
                </span>
                <div v-if="fecha.citas && fecha.citas.length > 0" class="mt-1 space-y-1">
                  <div
                    v-for="cita in fecha.citas"
                    :key="cita.id"
                    class="text-xs p-1 rounded bg-sky-100 text-blue-800 truncate cursor-pointer hover:bg-sky-200"
                    @click="verDetalleCita(cita)"
                  >
                    <span class="hidden sm:inline">{{ cita.hora }} - </span>{{ cita.paciente }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Vista: Especialidades -->
        <div v-if="vistaActiva === 'especialidades'" class="space-y-8">
          <div class="flex justify-between items-center">
            <h1 class="text-3xl font-bold text-gray-900">Nuestras Especialidades</h1>
            <button
              @click="mostrarModalAgendar"
              class="px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-500 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-sky-600 transition-all duration-300"
            >
              Agendar Cita
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <div v-for="especialidad in especialidades" :key="especialidad.id" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <div class="text-center">
                <div class="w-16 h-16 bg-gradient-to-br from-sky-500 to-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <!-- Iconos de especialidades -->
                  <svg v-if="especialidad.nombre === 'Terapia Individual'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                  <svg v-else-if="especialidad.nombre === 'Terapia de Pareja'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                  <svg v-else-if="especialidad.nombre === 'Manejo del Estrés'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                  <svg v-else class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                  </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ especialidad.nombre }}</h3>
                <p class="text-gray-600 mb-4">{{ especialidad.descripcion }}</p>
                <div class="flex items-center justify-center space-x-4 mb-4">
                  <span class="text-sm text-blue-600 font-medium">{{ especialidad.duracion }}</span>
                  <span class="text-gray-400">•</span>
                  <span class="text-sm text-gray-500">{{ especialidad.precio }}</span>
                </div>
                <button
                  @click="agendarEspecialidad(especialidad)"
                  class="w-full bg-gradient-to-r from-sky-500 to-sky-500 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-sky-600 transition-all duration-300"
                >
                  Agendar
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Vista: Perfil -->
        <div v-if="vistaActiva === 'perfil'" class="space-y-8">
          <div class="flex justify-between items-center">
            <h1 class="text-3xl font-bold text-gray-900">Mi Perfil</h1>
            <button
              @click="editarPerfil = true"
              class="px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-500 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-sky-600 transition-all duration-300"
            >
              Editar Perfil
            </button>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div class="text-center py-8">
              <div class="w-24 h-24 bg-gradient-to-br from-sky-500 to-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p class="text-gray-600 mb-4">Para gestionar tu perfil, necesitas iniciar sesión</p>
              <router-link
                to="/login"
                class="inline-block bg-gradient-to-r from-blue-600 to-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-sky-600 transition-all duration-300"
              >
                Iniciar Sesión
              </router-link>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Modal para Agendar Cita -->
    <div v-if="modalAgendar" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div class="bg-white rounded-2xl w-full max-w-md max-h-[95vh] overflow-y-auto">
        <div class="p-4 sm:p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl sm:text-2xl font-bold text-gray-900">Agendar Cita</h3>
            <button
              @click="modalAgendar = false"
              class="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="agendarCita" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
              <input
                v-model="formCita.nombre"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                v-model="formCita.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
              <input
                v-model="formCita.telefono"
                type="tel"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="+51 999 999 999"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Especialidad</label>
              <select
                v-model="formCita.especialidad"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="">Selecciona una especialidad</option>
                <option value="terapia-individual">Terapia Individual</option>
                <option value="terapia-pareja">Terapia de Pareja</option>
                <option value="manejo-estres">Manejo del Estrés</option>
                <option value="ansiedad">Ansiedad y Depresión</option>
                <option value="trauma">Trauma y PTSD</option>
                <option value="duelo">Proceso de Duelo</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Fecha Preferida</label>
              <input
                v-model="formCita.fecha"
                type="date"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Hora Preferida</label>
              <select
                v-model="formCita.hora"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="">Selecciona una hora</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
                <option value="17:00">05:00 PM</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Mensaje (Opcional)</label>
              <textarea
                v-model="formCita.mensaje"
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Describe brevemente tu situación o motivo de consulta"
              ></textarea>
            </div>

            <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
              <button
                type="button"
                @click="modalAgendar = false"
                class="w-full sm:flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="w-full sm:flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-sky-500 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-sky-600 transition-all duration-300"
              >
                Agendar Cita
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Estados de la vista
const vistaActiva = ref('dashboard')
const modalAgendar = ref(false)
const filtroEstado = ref('')
const editarPerfil = ref(false)
const sidebarVisible = ref(false)
const menuMobileVisible = ref(false)

// Formulario de cita
const formCita = ref({
  nombre: '',
  email: '',
  telefono: '',
  especialidad: '',
  fecha: '',
  hora: '',
  mensaje: ''
})

// Menú de navegación
const menuItems = ref([
  {
    id: 1,
    nombre: 'Dashboard',
    vista: 'dashboard'
  },
  {
    id: 2,
    nombre: 'Mis Citas',
    vista: 'mis-citas'
  },
  {
    id: 3,
    nombre: 'Calendario',
    vista: 'calendario'
  },
  {
    id: 4,
    nombre: 'Especialidades',
    vista: 'especialidades'
  },
  {
    id: 5,
    nombre: 'Mi Perfil',
    vista: 'perfil'
  }
])

// Estadísticas del dashboard
const estadisticas = ref({
  citasHoy: 3,
  citasPendientes: 8,
  totalSesiones: 45,
  proximaCita: '15:00 PM'
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

// Lista completa de citas
const todasLasCitas = ref([
  {
    id: 1,
    paciente: 'María González',
    iniciales: 'MG',
    email: 'maria@email.com',
    especialidad: 'Terapia Individual',
    fecha: '15 Dic 2024',
    hora: '10:00 AM',
    estado: 'confirmada'
  },
  {
    id: 2,
    paciente: 'Carlos Ruiz',
    iniciales: 'CR',
    email: 'carlos@email.com',
    especialidad: 'Terapia de Pareja',
    fecha: '15 Dic 2024',
    hora: '15:00 PM',
    estado: 'pendiente'
  },
  {
    id: 3,
    paciente: 'Ana Martínez',
    iniciales: 'AM',
    email: 'ana@email.com',
    especialidad: 'Manejo del Estrés',
    fecha: '16 Dic 2024',
    hora: '09:00 AM',
    estado: 'confirmada'
  }
])

// Especialidades
const especialidades = ref([
  {
    id: 1,
    nombre: 'Terapia Individual',
    descripcion: 'Sesiones personalizadas para abordar problemas específicos.',
    duracion: '50 minutos',
    precio: 'S/ 80'
  },
  {
    id: 2,
    nombre: 'Terapia de Pareja',
    descripcion: 'Mejora la comunicación y fortalece los lazos afectivos.',
    duracion: '80 minutos',
    precio: 'S/ 120'
  },
  {
    id: 3,
    nombre: 'Manejo del Estrés',
    descripcion: 'Técnicas efectivas para manejar el estrés y la ansiedad.',
    duracion: '50 minutos',
    precio: 'S/ 80'
  }
])

// Notificaciones
const notificaciones = ref([
  { id: 1, mensaje: 'Nueva cita agendada para mañana' },
  { id: 2, mensaje: 'Recordatorio: Cita en 2 horas' }
])

// Calendario
const mesActual = ref('Diciembre 2024')
const calendario = ref<Array<{
  dia: number;
  esHoy: boolean;
  citas: Array<{
    id: number;
    paciente: string;
    iniciales: string;
    email: string;
    especialidad: string;
    fecha: string;
    hora: string;
    estado: string;
  }> | null;
}>>([])

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

const mostrarModalAgendar = () => {
  modalAgendar.value = true
}

const mostrarNotificaciones = () => {
  // Implementar lógica de notificaciones
  console.log('Mostrar notificaciones')
}

const agendarCita = () => {
  console.log('Cita agendada:', formCita.value)
  alert('¡Cita agendada exitosamente! Te contactaremos pronto para confirmar.')

  formCita.value = {
    nombre: '',
    email: '',
    telefono: '',
    especialidad: '',
    fecha: '',
    hora: '',
    mensaje: ''
  }

  modalAgendar.value = false
}

const agendarEspecialidad = (especialidad: { nombre: string }) => {
  formCita.value.especialidad = especialidad.nombre
  mostrarModalAgendar()
}

const verDetalleCita = (cita: { id: number; hora: string; paciente: string }) => {
  console.log('Ver detalle de cita:', cita)
}

const mesAnterior = () => {
  // Implementar lógica para mes anterior
  console.log('Mes anterior')
}

const mesSiguiente = () => {
  // Implementar lógica para mes siguiente
  console.log('Mes siguiente')
}

const getEstadoClass = (estado: string) => {
  switch (estado) {
    case 'confirmada':
      return 'bg-sky-100 text-blue-800'
    case 'pendiente':
      return 'bg-yellow-100 text-yellow-800'
    case 'cancelada':
      return 'bg-red-100 text-red-800'
    case 'completada':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Computed properties
const citasFiltradas = computed(() => {
  if (!filtroEstado.value) return todasLasCitas.value
  return todasLasCitas.value.filter(cita => cita.estado === filtroEstado.value)
})

// Inicialización del calendario
onMounted(() => {
  // Generar calendario del mes actual
  const diasEnMes = 31

  calendario.value = Array.from({ length: diasEnMes }, (_, i) => {
    const dia = i + 1
    const esHoy = dia === 15 // Ejemplo: día 15 es hoy

    // Buscar citas para este día
    const citas = todasLasCitas.value.filter(cita => {
      const fechaCita = parseInt(cita.fecha.split(' ')[0])
      return fechaCita === dia
    })

    return {
      dia,
      esHoy,
      citas: citas.length > 0 ? citas : null
    }
  })
})

// Los iconos ahora se renderizan directamente en el template como SVG
</script>

<style scoped>
/* Estilos adicionales para el dashboard */
</style>
