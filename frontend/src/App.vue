<script setup lang="ts">
import { computed } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useUserStore } from '@/stores/user'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import LoginPage from '@/components/LoginPage.vue'

useAuth()
const userStore = useUserStore()
const isLoggedIn = computed(() => !!userStore.user)
</script>

<template>
  <LoginPage v-if="!isLoggedIn" />
  <div v-else class="flex min-h-screen">
    <Sidebar />
    <div class="flex flex-1 flex-col">
      <Header />
      <main class="flex-1 p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>
