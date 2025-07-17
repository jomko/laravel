<template>
  <div class="min-h-screen flex items-center justify-center bg-muted">
    <form @submit.prevent="login" class="space-y-4 bg-white p-8 shadow-xl rounded-xl w-full max-w-sm">
      <h1 class="text-xl font-semibold">Вхід до Моркви</h1>
      <Input v-model="email" placeholder="Email" type="email" />
      <Input v-model="password" placeholder="Пароль" type="password" />
      <Button type="submit" class="w-full">Увійти</Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const email = ref('')
const password = ref('')
const router = useRouter()
const userStore = useUserStore()

const login = async () => {
  try {
    const { data } = await axios.post('/api/login', { email: email.value, password: password.value })
    axios.defaults.headers.common.Authorization = `Bearer ${data.token}`
    userStore.setUser(data.user)
    router.push('/')
  } catch (e) {
    alert('Невірний email або пароль')
  }
}
</script>
