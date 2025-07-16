<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CheckboxRoot, CheckboxIndicator } from 'radix-vue'
import { Icon } from '@iconify/vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class']; modelValue?: boolean }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()
</script>

<template>
  <CheckboxRoot
    :checked="modelValue"
    @update:checked="emit('update:modelValue', $event as boolean)"
    v-bind="$attrs"
    :class="cn('peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground', props.class)"
  >
    <CheckboxIndicator class="flex items-center justify-center text-current">
      <Icon icon="radix-icons:check" class="h-4 w-4" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
