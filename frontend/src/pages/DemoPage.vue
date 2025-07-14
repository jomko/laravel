<script setup lang="ts">
import { Button } from 'shadcn-vue'
import { theme, toggleTheme } from '../lib/theme'
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-4">
    <Button @click="toggleTheme">
      Toggle {{ theme === 'dark' ? 'Light' : 'Dark' }} Mode
    </Button>
    <p class="text-xl font-semibold">Morkva 2.0 працює 🌱</p>
  </div>
</template>
