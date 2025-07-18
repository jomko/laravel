<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { Dialog } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'

const mode = ref<'login' | 'register'>('login')
</script>

<template>
  <header class="flex items-center justify-between px-6 py-4 border-b bg-background">
    <RouterLink to="/" class="flex items-center">
      <img src="/logo.png" alt="Logo" class="h-8" />
    </RouterLink>

    <Dialog>
      <template #trigger>
        <Button variant="ghost" class="p-2">
          <Icon icon="lucide:user" class="w-6 h-6" />
        </Button>
      </template>
      <template #title>
        {{ mode === 'login' ? 'Log in' : 'Sign up' }}
      </template>
      <component
        :is="mode === 'login' ? LoginForm : RegisterForm"
        @switch="(m: 'login' | 'register') => (mode = m)"
      />
    </Dialog>
  </header>
</template>
