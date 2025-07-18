<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'

useAuth()
const route = useRoute()
</script>

<template>
    <router-view v-if="route.path === '/login'" />
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
