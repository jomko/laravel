<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { Dialog } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import ForgotPasswordForm from '@/components/ForgotPasswordForm.vue'

const mode = ref<'login' | 'register' | 'forgot'>('login')
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
        {{
          mode === 'login'
            ? 'Log in'
            : mode === 'register'
              ? 'Sign up'
              : 'Forgot password'
        }}
      </template>
      <component
        :is="mode === 'login' ? LoginForm : mode === 'register' ? RegisterForm : ForgotPasswordForm"
        @switch="(m: 'login' | 'register' | 'forgot') => (mode = m)"
      />
    </Dialog>
  </header>
</template>
