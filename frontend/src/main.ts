import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { vueQueryPluginOptions } from './plugins/vueQuery'
import { createPinia } from 'pinia'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
axios.defaults.withCredentials = true

const storedToken = localStorage.getItem('token')
if (storedToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`
}

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, vueQueryPluginOptions)
app.mount('#app')
