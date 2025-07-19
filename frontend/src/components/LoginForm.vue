<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'

const emit = defineEmits<{
  (e: 'switch', mode: 'login' | 'register' | 'forgot'): void
}>()

const email = ref('')
const password = ref('')
const error = ref<string | null>(null)
const userStore = useUserStore()

const login = async () => {
  error.value = null
  try {
    await axios.get('/sanctum/csrf-cookie')
    const { data } = await axios.post('/api/login', {
      email: email.value,
      password: password.value,
    })
    userStore.setUser(data.user)
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Invalid credentials'
  }
}
</script>

<template>
  <Card class="mx-auto w-full max-w-md">
    <form class="space-y-6" @submit.prevent="login">
      <CardHeader class="space-y-2 text-center">
        <CardTitle>Welcome back</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <Input v-model="email" placeholder="you@example.com" type="email" />
        <Input v-model="password" placeholder="••••••••" type="password" />
        <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
      </CardContent>
      <CardFooter class="flex flex-col space-y-4">
        <div class="w-full text-right">
          <button type="button" class="text-xs text-muted-foreground hover:underline" @click="emit('switch', 'forgot')">Forgot your password?</button>
        </div>
        <Button type="submit" class="w-full">Log in</Button>
        <p class="text-sm text-center text-muted-foreground">
          Don’t have an account?
          <button type="button" class="underline hover:text-primary" @click="emit('switch', 'register')">Sign up</button>
        </p>
      </CardFooter>
    </form>
  </Card>
</template>
