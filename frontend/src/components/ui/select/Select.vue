<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectViewport
} from 'radix-vue'
import { Icon } from '@iconify/vue'
import { cn } from '@/lib/utils'
const props = defineProps<{ modelValue?: string; class?: HTMLAttributes['class'] }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()
</script>

<template>
  <SelectRoot :model-value="modelValue" @update:modelValue="emit('update:modelValue', $event as string)">
    <SelectTrigger :class="cn('flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', props.class)">
      <SelectValue placeholder="Оберіть" />
      <Icon icon="radix-icons:chevron-down" class="h-4 w-4 opacity-50" />
    </SelectTrigger>
    <SelectContent class="relative z-50 min-w-[8rem] overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md">
      <SelectViewport class="p-1">
        <SelectGroup>
          <slot />
        </SelectGroup>
      </SelectViewport>
    </SelectContent>
  </SelectRoot>
</template>
