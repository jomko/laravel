import { createRouter, createWebHistory } from 'vue-router'
import HelloWorldPage from '@/components/HelloWorldPage.vue'

const routes = [
  { path: '/', component: HelloWorldPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
