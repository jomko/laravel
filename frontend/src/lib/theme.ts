import { ref, watch } from 'vue'

export const theme = ref<'light' | 'dark'>('light')

watch(theme, (value) => {
  document.documentElement.classList.toggle('dark', value === 'dark')
})

export function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
