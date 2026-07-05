import { ref, onMounted } from 'vue'

/**
 * Composable for managing dark/light mode.
 * Persists preference to localStorage and syncs with system preference.
 */
export function useDarkMode() {
  const isDark = ref(false)

  onMounted(() => {
    const prefersDark =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)

    if (prefersDark) {
      isDark.value = true
      document.documentElement.classList.add('dark')
    }
  })

  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    }
  }

  return { isDark, toggleDarkMode }
}
