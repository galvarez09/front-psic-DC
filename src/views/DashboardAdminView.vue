<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navegación Superior -->
    <nav class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div class="flex justify-between items-center h-14 sm:h-16">
          <!-- Logo y Título -->
          <div class="flex items-center space-x-2 sm:space-x-3">
            <div class="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 class="text-sm sm:text-lg font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Administrador del Sistema
              </h1>
              <p class="text-xs text-gray-500 hidden sm:block">Panel de Control</p>
            </div>
          </div>

          <!-- Botones de Acción -->
          <div class="flex items-center space-x-2 sm:space-x-4">
            <!-- Notificaciones -->
            <button
              @click="mostrarNotificaciones"
              class="relative p-1.5 sm:p-2 text-gray-600 hover:text-indigo-600 transition-colors"
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
              class="px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-700 hover:text-indigo-600 transition-colors duration-300 border border-gray-300 rounded-lg hover:bg-gray-50 sm:border-none sm:rounded-none sm:hover:bg-transparent"
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
              class="lg:hidden p-1.5 text-gray-600 hover:text-indigo-600 transition-colors"
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
              Panel de Control
            </div>

            <button
              @click="cambiarVista('dashboard')"
              class="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5v4m4-4v4m4-4v4M8 13v4m4-4v4m4-4v4"></path></svg>
              <span>Dashboard</span>
            </button>

            <button
              @click="cambiarVista('usuarios')"
              class="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path></svg>
              <span>Gestionar Usuarios</span>
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
              @click="cambiarVista('reportes')"
              class="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              <span>Reportes</span>
            </button>

            <button
              @click="cambiarVista('configuracion')"
              class="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span>Configuración</span>
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
              :class="vistaActiva === item.vista ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
            >
              <!-- Iconos del sidebar -->
              <svg v-if="item.vista === 'dashboard'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5v4m4-4v4m4-4v4M8 13v4m4-4v4m4-4v4"></path></svg>
              <svg v-else-if="item.vista === 'usuarios'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path></svg>
              <svg v-else-if="item.vista === 'citas'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <svg v-else-if="item.vista === 'reportes'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              <svg v-else-if="item.vista === 'configuracion'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
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
            <h1 class="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
            <div class="flex space-x-3">
              <button
                @click="mostrarModalNuevoUsuario"
                class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center space-x-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Nuevo Usuario</span>
              </button>
              <button
                @click="generarReporte"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center space-x-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                <span>Generar Reporte</span>
              </button>
            </div>
          </div>

          <!-- Estadísticas Rápidas -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Total Usuarios</p>
                  <p class="text-2xl font-bold text-gray-900">{{ estadisticas.totalUsuarios }}</p>
                </div>
                <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path></svg>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Citas del Mes</p>
                  <p class="text-2xl font-bold text-gray-900">{{ estadisticas.citasMes }}</p>
                </div>
                <div class="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Ingresos Totales</p>
                  <p class="text-2xl font-bold text-gray-900">{{ estadisticas.ingresosTotales }}</p>
                </div>
                <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Sistema</p>
                  <p class="text-2xl font-bold text-gray-900">{{ estadisticas.estadoSistema }}</p>
                </div>
                <div class="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Actividad Reciente -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100">
            <div class="p-6 border-b border-gray-100">
              <h3 class="text-lg font-semibold text-gray-900">Actividad Reciente del Sistema</h3>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div v-for="actividad in actividadReciente" :key="actividad.id" class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h4 class="font-semibold text-gray-900">{{ actividad.titulo }}</h4>
                    <p class="text-sm text-gray-600">{{ actividad.descripcion }}</p>
                    <p class="text-xs text-gray-500">{{ actividad.tiempo }}</p>
                  </div>
                  <div class="text-right">
                    <span :class="getEstadoClass(actividad.tipo)" class="px-2 py-1 text-xs font-medium rounded-full">
                      {{ actividad.tipo }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Otras vistas se implementarán aquí -->
        <div v-if="vistaActiva === 'usuarios'" class="space-y-8">
          <h1 class="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p class="text-gray-600">Vista para gestionar usuarios del sistema (en desarrollo)</p>
        </div>

        <div v-if="vistaActiva === 'citas'" class="space-y-8">
          <h1 class="text-3xl font-bold text-gray-900">Gestión de Citas</h1>
          <p class="text-gray-600">Vista para gestión global de citas (en desarrollo)</p>
        </div>

        <div v-if="vistaActiva === 'reportes'" class="space-y-8">
          <h1 class="text-3xl font-bold text-gray-900">Reportes del Sistema</h1>
          <p class="text-gray-600">Vista para generar y visualizar reportes (en desarrollo)</p>
        </div>

        <div v-if="vistaActiva === 'configuracion'" class="space-y-8">
          <h1 class="text-3xl font-bold text-gray-900">Configuración del Sistema</h1>
          <p class="text-gray-600">Vista para configurar parámetros del sistema (en desarrollo)</p>
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
    nombre: 'Gestionar Usuarios',
    vista: 'usuarios'
  },
  {
    id: 3,
    nombre: 'Gestionar Citas',
    vista: 'citas'
  },
  {
    id: 4,
    nombre: 'Reportes',
    vista: 'reportes'
  },
  {
    id: 5,
    nombre: 'Configuración',
    vista: 'configuracion'
  }
])

// Estadísticas del dashboard
const estadisticas = ref({
  totalUsuarios: 156,
  citasMes: 89,
  ingresosTotales: 'S/ 12,450',
  estadoSistema: 'Activo'
})

// Actividad reciente del sistema
const actividadReciente = ref([
  {
    id: 1,
    titulo: 'Nuevo usuario registrado',
    descripcion: 'María González se registró en el sistema',
    tiempo: 'Hace 5 minutos',
    tipo: 'info'
  },
  {
    id: 2,
    titulo: 'Cita cancelada',
    descripcion: 'Cita de Carlos Ruiz fue cancelada',
    tiempo: 'Hace 15 minutos',
    tipo: 'warning'
  },
  {
    id: 3,
    titulo: 'Sesión completada',
    descripcion: 'Sesión de Ana Martínez finalizada exitosamente',
    tiempo: 'Hace 1 hora',
    tipo: 'success'
  },
  {
    id: 4,
    titulo: 'Error del sistema',
    descripcion: 'Problema de conexión resuelto',
    tiempo: 'Hace 2 horas',
    tipo: 'error'
  }
])

// Notificaciones
const notificaciones = ref([
  { id: 1, mensaje: 'Nuevo usuario registrado' },
  { id: 2, mensaje: 'Reporte mensual generado' },
  { id: 3, mensaje: 'Actualización del sistema disponible' }
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

const mostrarModalNuevoUsuario = () => {
  console.log('Mostrar modal nuevo usuario')
}

const generarReporte = () => {
  console.log('Generar reporte')
}

const cerrarSesion = () => {
  console.log('Cerrar sesión')
  // Aquí se implementaría la lógica de cierre de sesión
}

const getEstadoClass = (tipo: string) => {
  switch (tipo) {
    case 'success':
      return 'bg-sky-100 text-blue-800'
    case 'warning':
      return 'bg-yellow-100 text-yellow-800'
    case 'error':
      return 'bg-red-100 text-red-800'
    case 'info':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>

<style scoped>
/* Estilos adicionales para el dashboard */
</style>
