import { useQuery } from '@tanstack/vue-query'
import { watchEffect } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

export function useAuth() {
  const userStore = useUserStore()

  const query = useQuery<{ id: number; name: string; email: string }>({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await axios.get('/api/user')
      return data
    },
    retry: false,
  })

  watchEffect(() => {
    if (query.data.value) {
      userStore.setUser(query.data.value)
    }
    if (query.error.value) {
      userStore.logout()
    }
  })

  return query
}
