<script setup>
import { useDarkMode } from '../composables/useDarkMode.js'
import { useMobileMenu } from '../composables/useMobileMenu.js'
import CommandPalette from './CommandPalette.vue'

const props = defineProps({
  activeSection: {
    type: String,
    default: 'home',
  },
})

const { isDark, toggleDarkMode } = useDarkMode()
const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileMenu()

const openPalette = () => {
  window.dispatchEvent(new CustomEvent('open-command-palette'))
}

const navLinks = [
  { href: '#home', label: 'Home', id: 'home' },
  { href: '#about', label: 'About', id: 'about' },
  { href: '#experience', label: 'Experience', id: 'experience' },
  { href: '#skills', label: 'Skills', id: 'skills' },
  { href: '#projects', label: 'Projects & Research', id: 'projects' },
  { href: '#contact', label: 'Contact', id: 'contact' },
]

const isLinkActive = (linkId) => {
  if (linkId === 'projects') {
    return props.activeSection === 'projects' || props.activeSection === 'research'
  }
  return props.activeSection === linkId
}
</script>

<template>
  <!-- Desktop Nav (Floating Pill) -->
  <nav class="hidden lg:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 items-center justify-between gap-6 px-6 py-2.5 w-[92%] max-w-5xl h-14 bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-white/5 rounded-full shadow-2xl text-slate-800 dark:text-white slide-down">
    <!-- Brand Logo -->
    <a
      href="#home"
      class="text-xs sm:text-sm font-black uppercase tracking-[0.25em] gradient-text hover:scale-105 transition-transform cursor-pointer shrink-0"
    >
      Niyaz
    </a>

    <!-- Center Nav Links -->
    <div class="flex items-center gap-1 bg-slate-100/40 dark:bg-white/5 p-1 rounded-full border border-slate-200/10 dark:border-white/5">
      <a
        v-for="link in navLinks"
        :key="link.id"
        :href="link.href"
        :class="[
          'px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] rounded-full transition-all duration-300 whitespace-nowrap',
          isLinkActive(link.id)
            ? 'bg-white dark:bg-white/10 text-violet-650 dark:text-white shadow-sm'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200',
        ]"
      >
        {{ link.label }}
      </a>
    </div>

    <!-- Right Actions -->
    <div class="flex items-center gap-2.5 shrink-0">
      <!-- Hire Me Button -->
      <a
        href="mailto:ahmadkhanniyaz@gmail.com"
        class="px-4 py-2 bg-gradient-to-r from-violet-600 to-blue-500 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full hover:from-violet-700 hover:to-blue-600 hover:-translate-y-0.5 active:scale-95 transition-all shadow-md shadow-violet-200 dark:shadow-violet-900/40 inline-flex items-center gap-1 shrink-0 cursor-pointer"
      >
        Hire Me
        <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
        </svg>
      </a>

      <!-- CV Download Button -->
      <a
        href="/cv.pdf"
        download
        class="px-3.5 py-2 border border-slate-250 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:text-violet-650 dark:hover:text-violet-400 hover:border-violet-300 dark:hover:border-violet-700 rounded-full text-[9px] font-black uppercase tracking-[0.2em] hover:-translate-y-0.5 active:scale-95 transition-all inline-flex items-center gap-1 shrink-0 cursor-pointer"
      >
        CV
        <svg class="w-3 h-3 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      </a>

      <!-- Dark Mode Toggle -->
      <button
        @click="toggleDarkMode"
        class="p-2 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-650 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:rotate-12 active:scale-90 transition-all shrink-0 cursor-pointer"
        aria-label="Toggle Dark Mode"
      >
        <svg
          v-if="!isDark"
          class="h-4 w-4 icon-enter"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
        <svg
          v-else
          class="h-4 w-4 icon-enter"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </button>
    </div>
  </nav>

  <!-- Mobile Nav (Floating Card) -->
  <nav class="lg:hidden fixed top-4 left-4 right-4 z-50 h-14 bg-white/80 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-2xl shadow-xl text-slate-800 dark:text-white transition-all duration-300">
    <div class="flex items-center justify-between px-4 h-full">
      <!-- Brand Logo -->
      <a
        href="#home"
        class="text-xs font-black uppercase tracking-[0.25em] gradient-text"
      >
        Niyaz
      </a>

      <!-- Right Controls -->
      <div class="flex items-center gap-1">
        <!-- Dark Mode Toggle -->
        <button
          @click="toggleDarkMode"
          class="p-2 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-650 dark:text-slate-350 active:scale-90 transition-all cursor-pointer"
          aria-label="Toggle Dark Mode"
        >
          <svg
            v-if="!isDark"
            class="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
          <svg
            v-else
            class="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </button>

        <!-- Menu Toggle Button -->
        <button
          @click="toggleMobileMenu"
          class="p-2 text-slate-800 dark:text-white focus:outline-none active:scale-90 transition-all cursor-pointer"
          aria-label="Toggle Mobile Menu"
        >
          <svg
            v-if="!isMobileMenuOpen"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-3 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-3 scale-95"
    >
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden absolute top-[calc(100%+8px)] left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-40"
      >
        <div class="px-5 py-4 flex flex-col space-y-1">
          <a
            v-for="link in navLinks"
            :key="link.id"
            :href="link.href"
            @click="closeMobileMenu"
            :class="[
              'text-center py-2.5 px-4 rounded-xl text-[10px] font-black uppercase tracking-[0.25em] transition-all',
              isLinkActive(link.id)
                ? 'bg-violet-50 dark:bg-white/5 text-violet-600 dark:text-white'
                : 'text-slate-650 dark:text-slate-350 hover:bg-slate-55 dark:hover:bg-white/5',
            ]"
          >
            {{ link.label }}
          </a>
          <a
            href="mailto:ahmadkhanniyaz@gmail.com"
            @click="closeMobileMenu"
            class="mt-2 text-center py-3 px-4 bg-gradient-to-r from-violet-600 to-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-md hover:from-violet-700 hover:to-blue-600 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            Hire Me
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
            </svg>
          </a>
          <a
            href="/cv.pdf"
            download
            @click="closeMobileMenu"
            class="text-center py-3 px-4 bg-slate-50 dark:bg-[#1a1a1a]/50 border border-slate-200 dark:border-white/5 text-slate-800 dark:text-slate-200 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:border-violet-500 dark:hover:border-white/20 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            Download CV
            <svg class="w-3.5 h-3.5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </a>
        </div>
      </div>
    </Transition>

    <!-- Command Palette component -->
    <CommandPalette />
  </nav>
</template>
