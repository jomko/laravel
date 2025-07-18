<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

function logout() {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="flex items-center justify-between px-6 py-4 border-b bg-background">
    <div class="flex items-center">
      <img src="/logo.png" alt="Logo" class="h-8" />
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <button class="p-2">
          <Icon icon="lucide:user" class="w-6 h-6" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem @click="logout">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
</template>
