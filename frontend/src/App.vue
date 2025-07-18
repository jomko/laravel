<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import Header from '@/components/Header.vue'

useAuth()
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-1 p-4">
      <router-view />
    </main>
  </div>
</template>
