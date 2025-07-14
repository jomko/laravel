import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { vueQueryPluginOptions } from './plugins/vueQuery'

const app = createApp(App)
app.use(VueQueryPlugin, vueQueryPluginOptions)
app.mount('#app')
