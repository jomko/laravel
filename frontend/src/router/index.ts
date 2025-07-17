import { createRouter, createWebHistory } from 'vue-router'
import DemoPage from '@/components/DemoPage.vue'
import Login from '@/pages/Login.vue'

const routes = [
  { path: '/', component: DemoPage },
  { path: '/login', component: Login },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
