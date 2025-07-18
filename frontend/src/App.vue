<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

useAuth()

</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen py-2">
    <img src="/logo.png" alt="" />
    <router-view />
  </div>
</template>
