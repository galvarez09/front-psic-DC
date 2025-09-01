<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mobileMenuOpen = ref(false)
const scrolled = ref(false)
const currentSection = ref('inicio')

// Función para throttling del scroll
let ticking = false
const throttledHandleScroll = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      handleScroll()
      ticking = false
    })
    ticking = true
  }
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const handleScroll = () => {
  // Verificar que window y document estén disponibles
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }

    scrolled.value = window.scrollY > 50

  // Detectar la sección actual basada en el scroll
  const sections = ['inicio', 'servicios', 'acerca', 'contacto', 'roles']
  const navHeight = 80 // Altura de la navegación
  const scrollPosition = window.scrollY + navHeight + 120 // 120px de offset para mejor detección

  let newSection = 'inicio'

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i])
    if (section) {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight

      if (scrollPosition >= sectionTop) {
        newSection = sections[i]
        break
      }
    }
  }

  if (currentSection.value !== newSection) {
    currentSection.value = newSection
    // Actualizar la URL sin recargar la página
    router.replace({
      path: '/',
      hash: `#${newSection}`
    })
  }
}

// Función para hacer scroll suave a una sección
const scrollToSection = (sectionId: string) => {
  // Verificar que document esté disponible
  if (typeof document === 'undefined') {
    return
  }

  const section = document.getElementById(sectionId)
  if (section) {
    // Calcular la posición exacta considerando la altura de la navegación
    const navHeight = 80 // Altura de la navegación
    const sectionTop = section.offsetTop - navHeight - 20 // 20px de margen adicional

    // Hacer scroll suave a la posición calculada
    window.scrollTo({
      top: Math.max(0, sectionTop), // Evitar valores negativos
      behavior: 'smooth'
    })

    // Actualizar la sección actual inmediatamente
    currentSection.value = sectionId
  }
}

onMounted(() => {
  // Esperar a que el DOM esté completamente renderizado
  nextTick(() => {
    window.addEventListener('scroll', throttledHandleScroll)

    // Calcular el progreso inicial del scroll
    handleScroll()

    // Verificar si hay un hash en la URL al cargar la página
    if (window.location.hash) {
      const hash = window.location.hash.substring(1)
      if (['inicio', 'servicios', 'acerca', 'contacto', 'roles'].includes(hash)) {
        currentSection.value = hash
        // Hacer scroll a la sección después de un pequeño delay para que la página se renderice
        setTimeout(() => {
          scrollToSection(hash)
        }, 200)
      }
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', throttledHandleScroll)
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">


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
            <div class="ml-10 flex items-baseline space-x-6 relative pb-3">
              <!-- Indicador de sección activa mejorado -->
              <div
                class="absolute -bottom-1 h-1.5 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-700 ease-out rounded-full shadow-lg"
                :style="{
                  width: '90px',
                  transform: `translateX(${['inicio', 'servicios', 'acerca', 'contacto'].indexOf(currentSection) * 144}px)`
                }"
              >
                <!-- Efecto de brillo -->
                <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
              </div>
              <button
                @click="scrollToSection('inicio')"
                class="group relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                :class="[
                  scrolled ? 'text-gray-700' : 'text-white',
                  currentSection === 'inicio' ? (scrolled ? 'text-purple-600' : 'text-white') + ' font-semibold' : ''
                ]"
              >
                <span class="relative z-10">Inicio</span>
                <div
                  class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                  :class="[
                    currentSection === 'inicio' ? 'opacity-100' : '',
                    scrolled ? 'bg-gradient-to-r from-purple-100 to-pink-100' : 'bg-white/20'
                  ]"
                ></div>
              </button>
              <button
                @click="scrollToSection('servicios')"
                class="group relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                :class="[
                  scrolled ? 'text-gray-700' : 'text-white',
                  currentSection === 'servicios' ? (scrolled ? 'text-purple-600' : 'text-white') + ' font-semibold' : ''
                ]"
              >
                <span class="relative z-10">Servicios</span>
                <div
                  class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                  :class="[
                    currentSection === 'servicios' ? 'opacity-100' : '',
                    scrolled ? 'bg-gradient-to-r from-purple-100 to-pink-100' : 'bg-white/20'
                  ]"
                ></div>
              </button>
              <button
                @click="scrollToSection('acerca')"
                class="group relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                :class="[
                  scrolled ? 'text-gray-700' : 'text-white',
                  currentSection === 'acerca' ? (scrolled ? 'text-purple-600' : 'text-white') + ' font-semibold' : ''
                ]"
              >
                <span class="relative z-10">Acerca de</span>
                <div
                  class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                  :class="[
                    currentSection === 'acerca' ? 'opacity-100' : '',
                    scrolled ? 'bg-gradient-to-r from-purple-100 to-pink-100' : 'bg-white/20'
                  ]"
                ></div>
              </button>
              <button
                @click="scrollToSection('contacto')"
                class="group relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                :class="[
                  scrolled ? 'text-gray-700' : 'text-white',
                  currentSection === 'contacto' ? (scrolled ? 'text-purple-600' : 'text-white') + ' font-semibold' : ''
                ]"
              >
                <span class="relative z-10">Contacto</span>
                <div
                  class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                  :class="[
                    currentSection === 'contacto' ? 'opacity-100' : '',
                    scrolled ? 'bg-gradient-to-r from-purple-100 to-pink-100' : 'bg-white/20'
                  ]"
                ></div>
              </button>
            </div>
          </div>

          <!-- Botones de acción modernos -->
          <div class="hidden lg:block">
            <div class="ml-4 flex items-center space-x-3">
              <router-link
                to="/menu-principal"
                class="group relative px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span class="relative z-10">Menú Principal</span>
                <div
                  class="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></div>
              </router-link>
              <router-link
                to="/login"
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
              </router-link>
              <router-link
                to="/register"
                class="group relative px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span class="relative z-10">Registrarse</span>
                <div
                  class="absolute inset-0 bg-gradient-to-r from-purple-700 to-emerald-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></div>
              </router-link>
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
          <button
            @click="() => { scrollToSection('inicio'); mobileMenuOpen = false; }"
            class="group flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-300"
            :class="currentSection === 'inicio' ? 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600' : ''"
          >
            <svg
              class="w-5 h-5 mr-3 transition-colors"
              :class="currentSection === 'inicio' ? 'text-purple-600' : 'text-gray-400 group-hover:text-purple-600'"
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
          </button>
          <button
            @click="() => { scrollToSection('servicios'); mobileMenuOpen = false; }"
            class="group flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-300"
            :class="currentSection === 'servicios' ? 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600' : ''"
          >
            <svg
              class="w-5 h-5 mr-3 transition-colors"
              :class="currentSection === 'servicios' ? 'text-purple-600' : 'text-gray-400 group-hover:text-purple-600'"
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
          </button>
          <button
            @click="() => { scrollToSection('acerca'); mobileMenuOpen = false; }"
            class="group flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-300"
            :class="currentSection === 'acerca' ? 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600' : ''"
          >
            <svg
              class="w-5 h-5 mr-3 transition-colors"
              :class="currentSection === 'acerca' ? 'text-purple-600' : 'text-gray-400 group-hover:text-purple-600'"
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
          </button>
          <button
            @click="() => { scrollToSection('contacto'); mobileMenuOpen = false; }"
            class="group flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-300"
            :class="currentSection === 'contacto' ? 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600' : ''"
          >
            <svg
              class="w-5 h-5 mr-3 transition-colors"
              :class="currentSection === 'contacto' ? 'text-purple-600' : 'text-gray-400 group-hover:text-purple-600'"
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
          </button>

          <button
            @click="() => { scrollToSection('roles'); mobileMenuOpen = false; }"
            class="group flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-300"
            :class="currentSection === 'roles' ? 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600' : ''"
          >
            <svg
              class="w-5 h-5 mr-3 transition-colors"
              :class="currentSection === 'roles' ? 'text-purple-600' : 'text-gray-400 group-hover:text-purple-600'"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
            Roles
          </button>
          <div class="pt-4 pb-2 border-t border-gray-200/50 space-y-2">
            <router-link
              to="/menu-principal"
              class="w-full flex items-center px-4 py-3 rounded-xl text-base font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              Menú Principal
            </router-link>
            <router-link
              to="/login"
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
            </router-link>
            <router-link
              to="/register"
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
            </router-link>
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
            <router-link
              to="/menu-principal"
              class="group relative px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 overflow-hidden bg-white text-purple-600 hover:text-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span class="relative z-10">Acceder al Menú</span>
              <div
                class="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
            </router-link>
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
            <p class="text-gray-600 text-center mb-6">
              Sesiones personalizadas para abordar problemas específicos y desarrollar estrategias
              de afrontamiento efectivas.
            </p>
            <!-- Botón de WhatsApp en servicios -->
            <div class="text-center">
              <a
                href="https://wa.me/51994971261?text=Hola,%20me%20interesa%20la%20Terapia%20Individual"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors duration-300"
              >
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Consultar
              </a>
            </div>
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
            <p class="text-gray-600 text-center mb-6">
              Mejora la comunicación y fortalece los lazos afectivos en tu relación de pareja.
            </p>
            <!-- Botón de WhatsApp en servicios -->
            <div class="text-center">
              <a
                href="https://wa.me/51994971261?text=Hola,%20me%20interesa%20la%20Terapia%20de%20Pareja"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors duration-300"
              >
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Consultar
              </a>
            </div>
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
            <p class="text-gray-600 text-center mb-6">
              Aprende técnicas efectivas para manejar el estrés y la ansiedad en tu vida diaria.
            </p>
            <!-- Botón de WhatsApp en servicios -->
            <div class="text-center">
              <a
                href="https://wa.me/51994971261?text=Hola,%20me%20interesa%20el%20servicio%20de%20Manejo%20del%20Estrés"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors duration-300"
              >
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Consultar
              </a>
            </div>
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
                <div class="flex-1">
                  <p class="font-semibold text-gray-900">Teléfono</p>
                  <p class="text-gray-600">+51 994 971 261</p>
                </div>
                <!-- Botón de WhatsApp en contacto -->
                <a
                  href="https://wa.me/51994971261?text=Hola,%20me%20gustaría%20agendar%20una%20consulta%20psicológica"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="ml-3 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors duration-300 flex items-center space-x-2"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span>Chatear</span>
                </a>
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

    <!-- Indicador de secciones en el lado derecho -->
    <div class="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div class="flex flex-col space-y-4">
        <button
          v-for="section in ['inicio', 'servicios', 'acerca', 'contacto', 'roles']"
          :key="section"
          @click="scrollToSection(section)"
          class="group relative w-3 h-3 rounded-full transition-all duration-300"
          :class="currentSection === section ? 'bg-purple-600 scale-125' : 'bg-gray-400 hover:bg-gray-600'"
        >
          <span
            class="absolute right-8 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
          >
            {{ section.charAt(0).toUpperCase() + section.slice(1) }}
          </span>
        </button>
      </div>
    </div>

    <!-- Botón de WhatsApp flotante -->
    <a
      href="https://wa.me/51994971261?text=Hola,%20me%20gustaría%20agendar%20una%20consulta%20psicológica"
      target="_blank"
      rel="noopener noreferrer"
      class="fixed bottom-6 left-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-110 transition-all duration-300 z-40 group"
    >
      <!-- Icono de WhatsApp -->
      <svg class="w-7 h-7 mx-auto mt-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
      </svg>

      <!-- Tooltip -->
      <div class="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        ¡Chatea con nosotros!
        <div class="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
      </div>
    </a>

    <!-- Botón de volver arriba -->
    <button
      v-show="scrolled"
      @click="scrollToSection('inicio')"
      class="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 z-40"
    >
      <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>

    <!-- Sección de Roles y Dashboards -->
    <section id="roles" class="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Acceso por Roles</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Nuestro sistema está diseñado para diferentes tipos de usuarios, cada uno con su dashboard especializado
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Dashboard de Paciente -->
          <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Dashboard de Paciente</h3>
            <p class="text-gray-600 mb-6">
              Accede a tu historial de citas, agenda nuevas sesiones y gestiona tu perfil personal
            </p>
            <router-link
              to="/menu-principal"
              class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Acceder como Paciente
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>

          <!-- Dashboard de Psicóloga -->
          <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Dashboard Profesional</h3>
            <p class="text-gray-600 mb-6">
              Gestiona pacientes, citas y sesiones desde tu panel profesional especializado
            </p>
            <router-link
              to="/dashboard-psicologa"
              class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Acceder como Psicóloga
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>

          <!-- Dashboard de Administrador -->
          <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Panel de Administración</h3>
            <p class="text-gray-600 mb-6">
              Control total del sistema, gestión de usuarios, reportes y configuración avanzada
            </p>
            <router-link
              to="/dashboard-admin"
              class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Acceder como Admin
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>
        </div>

        <!-- Información adicional -->
        <div class="mt-16 text-center">
          <div class="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">¿No sabes qué rol usar?</h3>
            <p class="text-gray-600 mb-6">
              Para acceder a los dashboards especializados, primero debes iniciar sesión con las credenciales correspondientes
            </p>
            <router-link
              to="/login"
              class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Ir al Login
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
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
