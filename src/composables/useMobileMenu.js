import { ref } from 'vue'

/**
 * Composable for managing the mobile navigation menu state.
 */
export function useMobileMenu() {
  const isMobileMenuOpen = ref(false)

  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
  }

  return { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu }
}
