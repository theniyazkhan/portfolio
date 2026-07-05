import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable for tracking which section is currently in view
 * and whether the user has scrolled far enough to show the scroll-to-top button.
 *
 * @param {string[]} sectionIds - Array of element IDs to observe
 */
export function useScrollSpy(sectionIds) {
  const activeSection = ref(sectionIds[0] ?? '')
  const isScrolled = ref(false)

  let observer = null
  let scrollHandler = null

  onMounted(() => {
    // Track scroll depth for the scroll-to-top button
    scrollHandler = () => {
      isScrolled.value = window.scrollY > 400
    }
    window.addEventListener('scroll', scrollHandler, { passive: true })

    // IntersectionObserver to track which section is in view
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id
          }
        })
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: 0 }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
    if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return { activeSection, isScrolled, scrollToTop }
}
