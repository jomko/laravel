<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <header class="flex items-center justify-between px-6 py-4 border-b bg-background">
    <div class="flex items-center">
      <img src="/logo.png" alt="Logo" class="h-8" />
    </div>
    <button class="p-2">
      <Icon icon="lucide:user" class="w-6 h-6" />
    </button>
  </header>
</template>
