<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const mobileMenuOpen = ref(false)
const scrolled = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Navegación Moderna -->
    <nav
      class="fixed w-full z-50 transition-all duration-300"
      :class="scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <!-- Logo Moderno -->
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <svg
                    class="w-6 h-6 text-white"
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
                <div>
                  <h1
                    class="text-xl font-bold transition-all duration-300"
                    :class="
                      scrolled
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'
                        : 'text-white'
                    "
                  >
                    Psic. Diana Campos
                  </h1>
                  <p
                    class="text-xs font-medium transition-all duration-300"
                    :class="scrolled ? 'text-gray-500' : 'text-white/80'"
                  >
                    Consultorio Virtual
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Navegación Desktop Moderna -->
          <div class="hidden lg:block">
            <div class="ml-10 flex items-baseline space-x-1">
              <a
                href="#inicio"
                class="group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-purple-50 hover:text-purple-600"
                :class="scrolled ? 'text-gray-700' : 'text-white'"
              >
                <span class="relative z-10">Inicio</span>
                <div
                  class="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></div>
              </a>
              <a
                href="#servicios"
                class="group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-purple-50 hover:text-purple-600"
                :class="scrolled ? 'text-gray-700' : 'text-white'"
              >
                <span class="relative z-10">Servicios</span>
                <div
                  class="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></div>
              </a>
              <a
                href="#acerca"
                class="group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-purple-50 hover:text-purple-600"
                :class="scrolled ? 'text-gray-700' : 'text-white'"
              >
                <span class="relative z-10">Acerca de</span>
                <div
                  class="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></div>
              </a>
              <a
                href="#contacto"
                class="group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-purple-50 hover:text-purple-600"
                :class="scrolled ? 'text-gray-700' : 'text-white'"
              >
                <span class="relative z-10">Contacto</span>
                <div
                  class="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></div>
              </a>
            </div>
          </div>

          <!-- Botones de acción modernos -->
          <div class="hidden lg:block">
            <div class="ml-4 flex items-center space-x-3">
              <button
                class="group relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden"
                :class="
                  scrolled
                    ? 'text-purple-600 hover:text-purple-700'
                    : 'text-white hover:text-purple-200'
                "
              >
                <span class="relative z-10">Iniciar Sesión</span>
                <div
                  class="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></div>
              </button>
              <button
                class="group relative px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span class="relative z-10">Registrarse</span>
                <div
                  class="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></div>
              </button>
            </div>
          </div>

          <!-- Menú móvil moderno -->
          <div class="lg:hidden">
            <button
              @click="toggleMobileMenu"
              class="group p-2 rounded-xl transition-all duration-300"
              :class="scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'"
            >
              <div class="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  class="block w-5 h-0.5 transition-all duration-300"
                  :class="scrolled ? 'bg-gray-700' : 'bg-white'"
                  :style="mobileMenuOpen ? 'transform: rotate(45deg) translate(2px, 2px)' : ''"
                ></span>
                <span
                  class="block w-5 h-0.5 mt-1 transition-all duration-300"
                  :class="scrolled ? 'bg-gray-700' : 'bg-white'"
                  :style="mobileMenuOpen ? 'opacity: 0' : ''"
                ></span>
                <span
                  class="block w-5 h-0.5 mt-1 transition-all duration-300"
                  :class="scrolled ? 'bg-gray-700' : 'bg-white'"
                  :style="mobileMenuOpen ? 'transform: rotate(-45deg) translate(2px, -2px)' : ''"
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Menú móvil desplegable moderno -->
      <div
        v-if="mobileMenuOpen"
        class="lg:hidden transition-all duration-300 ease-in-out"
        :class="mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'"
      >
        <div
          class="px-4 pt-2 pb-6 space-y-2 bg-white/95 backdrop-blur-md border-t border-gray-200/50"
        >
          <a
            href="#inicio"
            class="group flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-300"
          >
            <svg
              class="w-5 h-5 mr-3 text-gray-400 group-hover:text-purple-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Inicio
          </a>
          <a
            href="#servicios"
            class="group flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-300"
          >
            <svg
              class="w-5 h-5 mr-3 text-gray-400 group-hover:text-purple-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
            Servicios
          </a>
          <a
            href="#acerca"
            class="group flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-300"
          >
            <svg
              class="w-5 h-5 mr-3 text-gray-400 group-hover:text-purple-600 transition-colors"
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
            Acerca de
          </a>
          <a
            href="#contacto"
            class="group flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-300"
          >
            <svg
              class="w-5 h-5 mr-3 text-gray-400 group-hover:text-purple-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Contacto
          </a>
          <div class="pt-4 pb-2 border-t border-gray-200/50 space-y-2">
            <button
              class="group w-full flex items-center px-4 py-3 rounded-xl text-base font-medium text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300"
            >
              <svg
                class="w-5 h-5 mr-3 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Iniciar Sesión
            </button>
            <button
              class="w-full flex items-center px-4 py-3 rounded-xl text-base font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="inicio" class="pt-20 gradient-hero text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center fade-in">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">Consultorio Virtual de Psicología</h1>
          <p class="text-xl md:text-2xl mb-8 text-purple-100">
            Cuidando tu bienestar mental desde la comodidad de tu hogar
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              class="group relative px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 overflow-hidden bg-white text-purple-600 hover:text-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span class="relative z-10">Agendar Cita</span>
              <div
                class="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
            </button>
            <button
              class="group relative px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 overflow-hidden border-2 border-white text-white hover:text-purple-600 hover:bg-white transform hover:-translate-y-0.5"
            >
              <span class="relative z-10">Conoce Más</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Servicios -->
    <section id="servicios" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos una amplia gama de servicios psicológicos para ayudarte en tu camino hacia el
            bienestar mental
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            class="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div
              class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6 mx-auto"
            >
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4 text-center">Terapia Individual</h3>
            <p class="text-gray-600 text-center">
              Sesiones personalizadas para abordar problemas específicos y desarrollar estrategias
              de afrontamiento efectivas.
            </p>
          </div>

          <div
            class="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div
              class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto"
            >
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4 text-center">Terapia de Pareja</h3>
            <p class="text-gray-600 text-center">
              Mejora la comunicación y fortalece los lazos afectivos en tu relación de pareja.
            </p>
          </div>

          <div
            class="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div
              class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6 mx-auto"
            >
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4 text-center">Manejo del Estrés</h3>
            <p class="text-gray-600 text-center">
              Aprende técnicas efectivas para manejar el estrés y la ansiedad en tu vida diaria.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Acerca de la Profesional -->
    <section id="acerca" class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Psicóloga Diana Campos
            </h2>
            <p class="text-lg text-gray-600 mb-6">
              Soy una psicóloga clínica especializada en terapia cognitivo-conductual con más de 8
              años de experiencia ayudando a personas a superar sus desafíos emocionales y mentales.
            </p>
            <div class="space-y-4">
              <div class="flex items-center">
                <div
                  class="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-3"
                >
                  <svg
                    class="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span class="text-gray-700">Licenciada en Psicología Clínica</span>
              </div>
              <div class="flex items-center">
                <div
                  class="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-3"
                >
                  <svg
                    class="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span class="text-gray-700">Especialista en Terapia Cognitivo-Conductual</span>
              </div>
              <div class="flex items-center">
                <div
                  class="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-3"
                >
                  <svg
                    class="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span class="text-gray-700">Más de 8 años de experiencia clínica</span>
              </div>
            </div>
          </div>
          <div class="text-center">
            <div
              class="w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto flex items-center justify-center"
            >
              <div class="text-white text-6xl font-bold">DC</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contacto -->
    <section id="contacto" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contáctanos</h2>
          <p class="text-xl text-gray-600">
            Estamos aquí para ayudarte. No dudes en contactarnos para más información.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-12">
          <div>
            <h3 class="text-2xl font-semibold text-gray-900 mb-6">Información de Contacto</h3>
            <div class="space-y-6">
              <div class="flex items-center">
                <div
                  class="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Correo de Trabajo</p>
                  <p class="text-gray-600">dcampos@digiand.pe</p>
                </div>
              </div>

              <div class="flex items-center">
                <div
                  class="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Correo Personal</p>
                  <p class="text-gray-600">cdelcarpio94@gmail.com</p>
                </div>
              </div>

              <div class="flex items-center">
                <div
                  class="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Teléfono</p>
                  <p class="text-gray-600">+51 994 971 261</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-2xl font-semibold text-gray-900 mb-6">Envíanos un Mensaje</h3>
            <form class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                <textarea
                  rows="4"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                class="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h3 class="text-2xl font-bold mb-4">Psicóloga Diana Campos</h3>
          <p class="text-gray-400 mb-6">Consultorio Virtual de Psicología</p>
          <div class="flex justify-center space-x-6">
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
                />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
            </a>
          </div>
          <p class="text-gray-400 mt-6">
            &copy; 2024 Consultorio Virtual Diana Campos. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
