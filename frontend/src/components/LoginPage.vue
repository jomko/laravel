<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const email = ref('')
const password = ref('')
const error = ref<string | null>(null)
const userStore = useUserStore()
const router = useRouter()

async function login() {
  error.value = null
  try {
    const { data } = await axios.post('/api/login', {
      email: email.value,
      password: password.value,
    })
    axios.defaults.headers.common.Authorization = `Bearer ${data.token}`
    userStore.setUser(data.user)
    router.push('/')
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Invalid credentials'
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center space-y-8">
    <img src="/logo.png" alt="Logo" class="h-16" />
    <form @submit.prevent="login" class="w-full max-w-sm space-y-4">
      <Input v-model="email" type="email" placeholder="Email" />
      <Input v-model="password" type="password" placeholder="Password" />
      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
      <Button type="submit" class="w-full">Log in</Button>
    </form>
  </div>
</template>
