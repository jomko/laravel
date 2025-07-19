<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ForgotPasswordForm from '@/components/ForgotPasswordForm.vue'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'

const mode = ref<'login' | 'forgot'>('login')
const email = ref('')
const password = ref('')
const error = ref<string | null>(null)
const userStore = useUserStore()
const router = useRouter()

watch(
  () => userStore.user,
  (user) => {
    if (user) router.push('/dashboard')
  },
  { immediate: true }
)

async function login() {
  error.value = null
  try {
    await axios.get('/sanctum/csrf-cookie')
    const { data } = await axios.post('/api/login', {
      email: email.value,
      password: password.value,
    })
    axios.defaults.headers.common.Authorization = `Bearer ${data.token}`
    localStorage.setItem('token', data.token)
    userStore.setUser(data.user)
    router.push('/dashboard')
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Invalid credentials'
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center space-y-8">
    <img src="/logo.png" alt="Logo" class="h-16" />
    <ForgotPasswordForm v-if="mode === 'forgot'" @switch="mode = $event" />
    <form v-else class="w-full" @submit.prevent="login">
      <Card class="mx-auto w-full max-w-md">
        <CardHeader class="space-y-2 text-center">
        <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
        <Input v-model="email" type="email" placeholder="Email" />
        <Input v-model="password" type="password" placeholder="Password" />
        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
        <div class="text-right">
          <button type="button" class="text-xs underline" @click="mode = 'forgot'">Forgot password?</button>
        </div>
        </CardContent>
        <CardFooter class="flex flex-col space-y-4">
          <Button type="submit" class="w-full">Log in</Button>
        </CardFooter>
      </Card>
    </form>
  </div>
</template>
