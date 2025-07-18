import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        theme: 'light' as 'light' | 'dark',
        locale: 'en',
    }),
    actions: {
        setTheme(theme: 'light' | 'dark') {
            this.theme = theme
        },
        setLocale(locale: string) {
            this.locale = locale
        },
    },
})
