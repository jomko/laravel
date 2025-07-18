<template>
  <div class="min-h-screen flex items-center justify-center bg-muted">
    <Card class="mx-auto w-full max-w-md">
      <form @submit.prevent="register" class="space-y-6">
        <CardHeader class="space-y-2 text-center">
          <CardTitle>Create an account</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <Input v-model="name" placeholder="Your name" />
          <Input v-model="email" placeholder="you@example.com" type="email" />
          <Input v-model="password" placeholder="••••••••" type="password" />
        </CardContent>
        <CardFooter class="flex flex-col space-y-4">
          <Button type="submit" class="w-full">Sign up</Button>
          <p class="text-sm text-center text-muted-foreground">
            Already have an account?
            <RouterLink to="/login" class="underline hover:text-primary">Log in</RouterLink>
          </p>
        </CardFooter>
      </form>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()
const userStore = useUserStore()

const register = async () => {
  try {
    const { data } = await axios.post('/api/register', {
      name: name.value,
      email: email.value,
      password: password.value,
    })
    axios.defaults.headers.common.Authorization = `Bearer ${data.token}`
    userStore.setUser(data.user)
    router.push('/')
  } catch (e) {
    alert('Registration failed')
  }
}
</script>
