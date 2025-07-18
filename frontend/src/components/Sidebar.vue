<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

interface MenuItem {
  label: string
  icon: string
  children?: MenuItem[]
}

const menuData: MenuItem[] = [
  {
    label: 'Inventory',
    icon: 'mdi:warehouse',
    children: [
      { label: 'Products', icon: 'mdi:package-variant' },
      { label: 'Stocktake', icon: 'mdi:clipboard-list-outline' },
    ],
  },
  {
    label: 'Sales',
    icon: 'mdi:cart-outline',
    children: [
      { label: 'Orders', icon: 'mdi:format-list-bulleted' },
      { label: 'Customers', icon: 'mdi:account-outline' },
    ],
  },
]

const collapsed = ref(false)
const open = ref<Record<number, boolean>>({})

function toggleItem(idx: number) {
  open.value[idx] = !open.value[idx]
}
</script>

<template>
  <aside :class="['h-screen border-r bg-muted transition-all duration-300', collapsed ? 'w-16' : 'w-60']">
    <div class="flex items-center justify-between p-2">
      <span v-if="!collapsed" class="font-bold">Menu</span>
      <button @click="collapsed = !collapsed" class="p-1">
        <Icon :icon="collapsed ? 'radix-icons:chevron-right' : 'radix-icons:chevron-left'" class="h-5 w-5" />
      </button>
    </div>
    <nav class="mt-2 space-y-1">
      <div v-for="(item, idx) in menuData" :key="item.label" class="px-1">
        <button
          @click="toggleItem(idx)"
          class="flex w-full items-center gap-2 rounded px-2 py-2 text-left hover:bg-accent"
          :class="open[idx] && !collapsed ? 'bg-accent' : ''"
        >
          <Icon :icon="item.icon" class="h-5 w-5" />
          <span v-if="!collapsed" class="flex-1">{{ item.label }}</span>
          <Icon
            v-if="!collapsed && item.children"
            :icon="open[idx] ? 'radix-icons:chevron-down' : 'radix-icons:chevron-right'"
            class="h-4 w-4"
          />
        </button>
        <ul v-if="!collapsed && item.children && open[idx]" class="ml-6 mt-1 space-y-1">
          <li v-for="child in item.children" :key="child.label">
            <a href="#" class="flex items-center gap-2 rounded px-2 py-1 text-sm hover:bg-accent">
              <Icon :icon="child.icon" class="h-4 w-4" />
              <span>{{ child.label }}</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>
