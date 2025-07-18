import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as null | { id: number; name: string; email: string },
    }),
    actions: {
        setUser(user: any) {
            this.user = user
        },
        async logout() {
            await axios.post('/api/logout')
            this.user = null
            localStorage.removeItem('token')
            delete axios.defaults.headers.common.Authorization
            router.push('/login')
        },
    },
})
