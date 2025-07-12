import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: 'morkovka-frontend.ddev.site',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://morkovka.ddev.site:8443',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
