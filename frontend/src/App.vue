<script setup lang="ts">
  import DemoPage from './components/DemoPage.vue'
  import Login from './pages/Login.vue'
  import { useUserStore } from '@/stores/user'
  import { useAuth } from '@/composables/useAuth'

  const userStore = useUserStore()
  // Load authenticated user data if a valid token exists
  useAuth()

</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen py-2">
    <img src="/logo.png" alt="">
    <component :is="userStore.user ? DemoPage : Login" />
    <DemoPage  />
  </div>
</template>