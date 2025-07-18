<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'

useAuth()
</script>

<template>
    <div class="flex min-h-screen">
        <Sidebar />
        <div class="flex flex-1 flex-col">
            <Header />
            <main class="flex-1 p-4">
                <router-view />
            </main>
        </div>
    </div>
</template>
