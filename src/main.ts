import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Importar Firebase
import './firebase/config'

// Importar estilos
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Inicializar autenticación
import { useAuthStore } from './stores/auth'
const authStore = useAuthStore()
authStore.initAuth()

app.mount('#app')
