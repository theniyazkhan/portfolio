<script setup>
import { useDarkMode } from '../composables/useDarkMode.js'
import { useMobileMenu } from '../composables/useMobileMenu.js'
import CommandPalette from './CommandPalette.vue'

defineProps({
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
  { href: '#education', label: 'Education', id: 'education' },
  { href: '#skills', label: 'Skills', id: 'skills' },
  { href: '#projects', label: 'Projects', id: 'projects' },
  { href: '#research', label: 'Research', id: 'research' },
  { href: '#contact', label: 'Contact', id: 'contact' },
]
</script>

<template>
  <!-- Fixed navbar — stays visible at all times -->
  <nav class="fixed top-0 left-0 right-0 z-50 slide-down">
    <!-- Glass background layer -->
    <div
      class="absolute inset-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    ></div>

    <div
      class="relative max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"
    >
      <!-- Logo -->
      <a
        href="#home"
        class="text-base sm:text-lg font-bold gradient-text hover:scale-105 transition-transform cursor-pointer z-50 truncate shrink-0"
      >
        Niyaz Ahmad Khan
      </a>

      <!-- Desktop nav links -->
      <div class="hidden lg:flex items-center gap-0.5">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="link.href"
          :class="[
            'relative px-2.5 py-2 text-xs font-semibold rounded-lg transition-all duration-300 whitespace-nowrap',
            activeSection === link.id
              ? 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40'
              : 'text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-slate-100 dark:hover:bg-slate-800/50',
          ]"
        >
          {{ link.label }}
          <!-- Active dot indicator -->
          <span
            v-if="activeSection === link.id"
            class="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-violet-600 dark:bg-violet-400 rounded-full"
          ></span>
        </a>

        <!-- Gradient Hire Me button — SVG sparkle icon, no emoji -->
        <a
          href="mailto:ahmadkhanniyaz@gmail.com"
          class="ml-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-blue-500 text-white text-xs font-bold rounded-full hover:from-violet-700 hover:to-blue-600 hover:-translate-y-0.5 active:scale-95 transition-all shadow-lg shadow-violet-200 dark:shadow-violet-900/40 hover:shadow-xl inline-flex items-center gap-1 shrink-0 cursor-pointer"
        >
          Hire Me
          <!-- Sparkle SVG icon -->
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
          </svg>
        </a>

        <!-- CV Download link -->
        <a
          href="/cv.pdf"
          download
          class="ml-1.5 px-3.5 py-2 border border-slate-250 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-violet-650 dark:hover:text-violet-400 hover:border-violet-300 dark:hover:border-violet-850 rounded-full text-xs font-bold hover:-translate-y-0.5 active:scale-95 transition-all shadow-sm inline-flex items-center gap-1 shrink-0 cursor-pointer"
        >
          CV
          <svg class="w-3.5 h-3.5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </a>

        <!-- Command palette button -->
        <button
          @click="openPalette"
          class="ml-1.5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-violet-650 dark:hover:text-violet-400 active:scale-90 transition-all shrink-0 cursor-pointer"
          title="Open Command Palette (Ctrl+K)"
          aria-label="Open Command Palette"
        >
          <svg class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </button>

        <!-- Dark mode toggle -->
        <button
          @click="toggleDarkMode"
          class="ml-1 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:rotate-12 active:scale-90 transition-all shrink-0"
          aria-label="Toggle Dark Mode"
        >
          <svg
            v-if="!isDark"
            class="h-4.5 w-4.5 icon-enter"
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
            class="h-4.5 w-4.5 icon-enter"
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

      <!-- Mobile controls -->
      <div class="lg:hidden flex items-center space-x-2 z-50">
        <!-- Command palette button -->
        <button
          @click="openPalette"
          class="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 active:scale-90 transition-all"
          title="Open Command Palette"
          aria-label="Open Command Palette"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </button>

        <button
          @click="toggleDarkMode"
          class="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 active:scale-90 transition-all"
          aria-label="Toggle Dark Mode"
        >
          <svg
            v-if="!isDark"
            class="h-5 w-5"
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
            class="h-5 w-5"
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

        <button
          @click="toggleMobileMenu"
          class="text-slate-900 dark:text-white focus:outline-none p-2 active:scale-90 transition-all"
          aria-label="Toggle Mobile Menu"
        >
          <svg
            v-if="!isMobileMenuOpen"
            class="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            class="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu dropdown -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden absolute top-16 left-0 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-2xl"
      >
        <div class="px-6 py-5 flex flex-col space-y-1.5">
          <a
            v-for="link in navLinks"
            :key="link.id"
            :href="link.href"
            @click="closeMobileMenu"
            :class="[
              'text-center py-3 px-4 rounded-xl text-sm font-medium transition-all',
              activeSection === link.id
                ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800',
            ]"
          >
            {{ link.label }}
          </a>
          <a
            href="mailto:ahmadkhanniyaz@gmail.com"
            @click="closeMobileMenu"
            class="mt-2 text-center py-3.5 px-4 bg-gradient-to-r from-violet-600 to-blue-500 text-white rounded-xl font-semibold shadow-md hover:from-violet-700 hover:to-blue-600 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            Hire Me
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
            </svg>
          </a>
          <a
            href="/cv.pdf"
            download
            @click="closeMobileMenu"
            class="text-center py-3.5 px-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl font-semibold hover:border-violet-500 dark:hover:border-violet-500 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            Download CV
            <svg class="w-4 h-4 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
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
