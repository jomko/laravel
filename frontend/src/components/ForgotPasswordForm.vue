<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'

const emit = defineEmits<{ (e: 'switch', mode: 'login'): void }>()

const email = ref('')

const reset = async () => {
  try {
    await axios.post('/api/forgot-password', { email: email.value })
    alert('Check your email for reset instructions')
    emit('switch', 'login')
  } catch (e) {
    alert('Failed to send reset link')
  }
}
</script>

<template>
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
          <button type="button" class="underline hover:text-primary" @click="emit('switch', 'login')">Back to login</button>
        </p>
      </CardFooter>
    </form>
  </Card>
</template>
