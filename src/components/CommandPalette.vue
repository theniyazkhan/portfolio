<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useDarkMode } from '../composables/useDarkMode.js'

const emit = defineEmits(['close'])

const isOpen = ref(false)
const search = ref('')
const activeIndex = ref(0)
const { toggleDarkMode } = useDarkMode()

const items = [
  // Navigation
  { id: 'go-home', title: 'Go to Home', category: 'Navigation', icon: '🏠', action: () => scrollToSection('home') },
  { id: 'go-about', title: 'Go to About Me', category: 'Navigation', icon: '👤', action: () => scrollToSection('about') },
  { id: 'go-experience', title: 'Go to Work Experience', category: 'Navigation', icon: '💼', action: () => scrollToSection('experience') },
  { id: 'go-education', title: 'Go to Education', category: 'Navigation', icon: '🎓', action: () => scrollToSection('education') },
  { id: 'go-skills', title: 'Go to Technical Skills', category: 'Navigation', icon: '⚡', action: () => scrollToSection('skills') },
  { id: 'go-projects', title: 'Go to Projects', category: 'Navigation', icon: '🚀', action: () => scrollToSection('projects') },
  { id: 'go-research', title: 'Go to Publications & Research', category: 'Navigation', icon: '📄', action: () => scrollToSection('research') },
  { id: 'go-contact', title: 'Go to Contact', category: 'Navigation', icon: '✉️', action: () => scrollToSection('contact') },
  
  // Theme & Pet Controls
  { id: 'toggle-theme', title: 'Toggle Dark/Light Mode', category: 'Preferences', icon: '🌗', action: () => toggleDarkMode() },
  { id: 'kitten-toggle', title: 'Summon / Dismiss Pet Kitten', category: 'Kitten Companion', icon: '🐱', action: () => triggerKitten('toggle-summon') },
  { id: 'kitten-feed', title: 'Feed Pet Kitten 🐟', category: 'Kitten Companion', icon: '🐟', action: () => triggerKitten('feed') },
  { id: 'kitten-play', title: 'Play with Pet Kitten 🧶', category: 'Kitten Companion', icon: '🧶', action: () => triggerKitten('play') },
  { id: 'kitten-sleep', title: 'Put Pet Kitten to Sleep 💤', category: 'Kitten Companion', icon: '💤', action: () => triggerKitten('sleep') },
  
  // Contact info
  { id: 'copy-email', title: 'Copy Email to Clipboard', category: 'Contact', icon: '📋', action: () => copyEmail() },
  { id: 'download-cv', title: 'Download CV / Resume', category: 'Contact', icon: '📄', action: () => { const a = document.createElement('a'); a.href = '/cv.pdf'; a.download = 'cv.pdf'; a.click(); close(); } },
  { id: 'visit-github', title: 'Open GitHub Profile', category: 'External Links', icon: '🐙', action: () => window.open('https://github.com/theniyazkhan', '_blank') },
  { id: 'visit-linkedin', title: 'Open LinkedIn Profile', category: 'External Links', icon: '🔗', action: () => window.open('https://www.linkedin.com/in/theniyazkhan/', '_blank') },
]

// Filtered commands
const filteredItems = computed(() => {
  if (!search.value) return items
  const query = search.value.toLowerCase().trim()
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
  )
})

// Scroll behavior helper
function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    close()
  }
}

// Dispatches command for KittenCompanion.vue
function triggerKitten(command) {
  window.dispatchEvent(new CustomEvent('kitten-command', { detail: command }))
  close()
}

// Copy email helper
function copyEmail() {
  navigator.clipboard.writeText('ahmadkhanniyaz@gmail.com')
  // Flash a notification bubble on screen
  const alertEl = document.createElement('div')
  alertEl.className = 'fixed bottom-12 left-1/2 -translate-x-1/2 z-50 px-5 py-3 bg-violet-600 text-white font-semibold rounded-2xl shadow-xl transition-all opacity-0 scale-90'
  alertEl.innerText = 'Email copied to clipboard! 📋'
  document.body.appendChild(alertEl)
  
  // Trigger transition
  setTimeout(() => {
    alertEl.classList.remove('opacity-0', 'scale-90')
    alertEl.classList.add('opacity-100', 'scale-100')
  }, 50)
  
  setTimeout(() => {
    alertEl.classList.remove('opacity-100', 'scale-100')
    alertEl.classList.add('opacity-0', 'scale-90')
    setTimeout(() => alertEl.remove(), 300)
  }, 2200)

  close()
}

// Show/Hide palette functions
function open() {
  isOpen.value = true
  search.value = ''
  activeIndex.value = 0
  document.body.style.overflow = 'hidden'
}

function close() {
  isOpen.value = false
  document.body.style.overflow = ''
  emit('close')
}

function selectItem(index) {
  const selected = filteredItems.value[index]
  if (selected && selected.action) {
    selected.action()
  }
}

// Keyboard navigation listeners
function handleKeyDown(e) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    if (isOpen.value) close()
    else open()
    return
  }

  if (!isOpen.value) return

  if (e.key === 'Escape') {
    e.preventDefault()
    close()
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = (activeIndex.value + 1) % filteredItems.value.length
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = (activeIndex.value - 1 + filteredItems.value.length) % filteredItems.value.length
  } else if (e.key === 'Enter') {
    e.preventDefault()
    selectItem(activeIndex.value)
  }
}

// Reset index on search query updates
function onSearchChange() {
  activeIndex.value = 0
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  // Listen to open events from external components like navbar triggers
  window.addEventListener('open-command-palette', open)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('open-command-palette', open)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <!-- Overlay backdrop -->
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 bg-slate-950/65 backdrop-blur-md"
        @click.self="close"
      >
        <!-- Modal command box -->
        <div
          class="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[70vh]"
        >
          <!-- Search input header -->
          <div class="relative flex items-center border-b border-slate-200/80 dark:border-slate-800/80 p-4 shrink-0">
            <span class="absolute left-4 text-slate-400 dark:text-slate-500">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              v-model="search"
              @input="onSearchChange"
              type="text"
              placeholder="Type a command or search..."
              class="w-full pl-10 pr-12 py-2 bg-transparent text-slate-950 dark:text-white placeholder-slate-450 dark:placeholder-slate-500 focus:outline-none text-base"
              autofocus
            />
            <span class="absolute right-4 px-2 py-0.5 text-[10px] font-bold border border-slate-200 dark:border-slate-800 rounded bg-slate-50 dark:bg-slate-950 text-slate-400 uppercase select-none">
              esc
            </span>
          </div>

          <!-- Actions List -->
          <div class="overflow-y-auto flex-1 p-2 space-y-1 select-none">
            <div
              v-if="filteredItems.length === 0"
              class="text-center py-10 text-slate-400 dark:text-slate-500 text-sm"
            >
              No matching commands found.
            </div>

            <template v-else>
              <!-- Grouping titles -->
              <div
                v-for="(item, idx) in filteredItems"
                :key="item.id"
                @mouseenter="activeIndex = idx"
                @click="selectItem(idx)"
                :class="[
                  'group flex items-center justify-between px-4 py-3 rounded-2xl transition-all cursor-pointer text-sm font-semibold',
                  activeIndex === idx
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/25'
                    : 'text-slate-700 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                ]"
              >
                <!-- Label & Category -->
                <div class="flex items-center gap-3">
                  <span class="text-base shrink-0 select-none">{{ item.icon }}</span>
                  <div class="flex flex-col">
                    <span>{{ item.title }}</span>
                    <span
                      :class="[
                        'text-[10px] font-bold tracking-wider uppercase mt-0.5',
                        activeIndex === idx ? 'text-violet-250' : 'text-slate-400 dark:text-slate-500'
                      ]"
                    >
                      {{ item.category }}
                    </span>
                  </div>
                </div>

                <!-- Shortcut tooltip -->
                <span
                  v-if="activeIndex === idx"
                  class="text-[10px] font-bold bg-violet-750/30 text-white rounded px-1.5 py-0.5 uppercase tracking-wide shrink-0"
                >
                  Enter
                </span>
              </div>
            </template>
          </div>

          <!-- Shortcuts Legend footer -->
          <div class="px-5 py-3 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/60 text-[10px] font-extrabold text-slate-400 tracking-wider uppercase flex justify-between items-center shrink-0 select-none">
            <div class="flex gap-4">
              <span class="flex items-center gap-1">
                <span class="border border-slate-200 dark:border-slate-800 rounded bg-white dark:bg-slate-900 px-1">↑↓</span> navigate
              </span>
              <span class="flex items-center gap-1">
                <span class="border border-slate-200 dark:border-slate-800 rounded bg-white dark:bg-slate-900 px-1">⏎</span> select
              </span>
            </div>
            <div class="flex items-center gap-1">
              Command Palette &bull; <span class="text-violet-500 dark:text-violet-400 font-black">Ctrl + K</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(100, 116, 139, 0.15);
  border-radius: 3px;
}
</style>
