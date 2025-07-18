<template>
  <div class="min-h-screen flex items-center justify-center bg-muted">
    <Card class="mx-auto w-full max-w-md">
      <form @submit.prevent="reset" class="space-y-6">
        <CardHeader class="space-y-2 text-center">
          <CardTitle>Forgot password</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <Input v-model="email" placeholder="you@example.com" type="email" />
        </CardContent>
        <CardFooter class="flex flex-col space-y-4">
          <Button type="submit" class="w-full">Send reset link</Button>
          <p class="text-sm text-center text-muted-foreground">
            <RouterLink to="/login" class="underline hover:text-primary">Back to login</RouterLink>
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

const email = ref('')
const router = useRouter()

const reset = async () => {
  try {
    await axios.post('/api/forgot-password', { email: email.value })
    alert('Check your email for reset instructions')
    router.push('/login')
  } catch (e) {
    alert('Failed to send reset link')
  }
}
</script>
