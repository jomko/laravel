<template>
  <div class="min-h-screen flex items-center justify-center bg-muted">
    <form class="rounded-xl border bg-card text-card-foreground shadow p-8 max-w-md mx-auto space-y-6">
      <div class="space-y-2 text-center">
        <h3 class="text-2xl font-semibold tracking-tight">Forgot password</h3>
        <p class="text-sm text-muted-foreground">Enter your email to reset your password</p>
      </div>
      <Input placeholder="m@example.com" type="email" />
      <Button class="w-full">Send reset link</Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
</script>
