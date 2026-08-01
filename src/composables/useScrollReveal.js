import { onMounted, onUnmounted } from 'vue'

/**
 * Composable that wires up an IntersectionObserver to add the `revealed`
 * class to any element with the `reveal` or `reveal-left` class when it
 * enters the viewport.
 *
 * Call once in the root App.vue after all children have mounted.
 *
 * @param {string} selector - CSS selector for elements to animate (default: '.reveal, .reveal-left')
 */
export function useScrollReveal(selector = '.reveal, .reveal-left') {
  let observer = null
  let mutationObserver = null

  const observeElements = () => {
    if (!observer) return
    document.querySelectorAll(selector).forEach((el) => {
      if (!el.dataset.revealObserved) {
        el.dataset.revealObserved = 'true'
        observer.observe(el)
      }
    })
  }

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )

    // Initial scan of static DOM elements
    observeElements()

    // Watch for async component mounts (e.g. ExploringSection, KittenCompanion)
    mutationObserver = new MutationObserver(() => {
      observeElements()
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
    if (mutationObserver) mutationObserver.disconnect()
  })
}
