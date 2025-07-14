<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'

interface Product {
  id: number
  name: string
}

const { data, error, isLoading } = useQuery<Product[]>({
  queryKey: ['products'],
  queryFn: async () => {
    const res = await fetch('/api/products')
    if (!res.ok) throw new Error('Failed to fetch')
    return res.json() as Promise<Product[]>
  },
})
</script>

<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error: {{ (error as Error).message }}</div>
    <ul v-else>
      <li v-for="product in data" :key="product.id">{{ product.name }}</li>
    </ul>
  </div>
</template>
