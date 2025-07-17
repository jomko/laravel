<template>
  <div class="min-h-screen flex items-center justify-center bg-muted">
    <Card class="mx-auto w-full max-w-md">
      <form @submit.prevent="login" class="space-y-6">
        <CardHeader class="space-y-2 text-center">
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Enter your email and password to log in to your account
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <Button variant="outline" class="w-full" @click="googleLogin">
            <span class="mr-2">G</span>
            Continue with Google
          </Button>
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t"></span>
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Input v-model="email" placeholder="you@example.com" type="email" />
          <Input v-model="password" placeholder="••••••••" type="password" />
        </CardContent>
        <CardFooter class="flex flex-col space-y-4">
          <div class="w-full text-right">
            <a href="/forgot-password" class="text-xs text-muted-foreground hover:underline">Forgot your password?</a>
          </div>
          <Button type="submit" class="w-full">Log in</Button>
          <p class="text-sm text-center text-muted-foreground">
            Don’t have an account?
            <a href="/register" class="underline hover:text-primary">Sign up</a>
          </p>
        </CardFooter>
      </form>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import axios from 'axios'
import { toast } from '@/components/ui/sonner'

const email = ref('')
const password = ref('')
const router = useRouter()
const userStore = useUserStore()

const login = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie')
    const { data } = await axios.post('/api/login', { email: email.value, password: password.value })
    axios.defaults.headers.common.Authorization = `Bearer ${data.token}`
    userStore.setUser(data.user)
    router.push('/')
  } catch (e) {
    toast.error('Invalid credentials')
  }
}

const googleLogin = () => {
  window.location.href = '/auth/google'
}
</script>
