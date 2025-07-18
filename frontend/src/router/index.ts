import { createRouter, createWebHistory } from 'vue-router'
import DemoPage from '@/components/DemoPage.vue'
const routes = [
  { path: '/', component: DemoPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
