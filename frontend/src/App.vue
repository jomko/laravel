<script setup lang="ts">
import DemoPage from './components/DemoPage.vue'
import { useAuth } from '@/composables/useAuth'

// Load authenticated user data if a valid token exists
useAuth()
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen py-2">
    <img src="/logo.png" alt="">
    <DemoPage  />
  </div>
</template>