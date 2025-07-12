<script setup lang="ts">
const props = defineProps<{ value: string }>()
import { SelectItem, SelectItemText, SelectItemIndicator } from 'radix-vue'
import { Icon } from '@iconify/vue'
</script>

<template>
  <SelectItem :value="props.value"
    class="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectItemIndicator>
        <Icon icon="radix-icons:check" class="h-4 w-4" />
      </SelectItemIndicator>
    </span>
    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>
</template>
