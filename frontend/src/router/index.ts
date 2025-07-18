import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/dashboard',
        component: () => import('@/components/HelloWorldPage.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        component: () => import('@/components/LoginPage.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to) => {
    const userStore = useUserStore()
    if (to.meta.requiresAuth && !userStore.user) {
        return { path: '/login', query: { redirect: to.fullPath } }
    }
})

export default router
