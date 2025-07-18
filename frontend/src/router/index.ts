import { createRouter, createWebHistory } from 'vue-router'
import DemoPage from '@/components/DemoPage.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import ForgotPassword from '@/pages/ForgotPassword.vue'

const routes = [
  { path: '/', component: DemoPage },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/forgot-password', component: ForgotPassword },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
