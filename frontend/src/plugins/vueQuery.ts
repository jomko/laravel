import { QueryClient, type VueQueryPluginOptions } from '@tanstack/vue-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient,
}
