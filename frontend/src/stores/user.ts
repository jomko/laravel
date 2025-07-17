import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as null | { id: number; name: string; email: string },
  }),
  actions: {
    setUser(user: any) {
      this.user = user
    },
    logout() {
      this.user = null
    },
  },
})
