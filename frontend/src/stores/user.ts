import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

export interface User {
    id: number
    name: string
    email: string
}

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as null | User,
    }),
    actions: {
        setUser(user: User) {
            this.user = user
        },
        async logout() {
            try {
                await axios.post('/api/logout')
            } catch (error: any) {
                const status = error?.response?.status
                if (status !== 401 && status !== 419) {
                    throw error
                }
            }
            this.user = null
            localStorage.removeItem('token')
            router.push('/login')
        },
    },
})
