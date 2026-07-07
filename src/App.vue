<script setup>
import AppNav from './components/AppNav.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ExperienceTimeline from './components/ExperienceTimeline.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ResearchSection from './components/ResearchSection.vue'
import ExploringSection from './components/ExploringSection.vue'
import ContactSection from './components/ContactSection.vue'
import KittenCompanion from './components/KittenCompanion.vue'

import { useScrollSpy } from './composables/useScrollSpy.js'
import { useScrollReveal } from './composables/useScrollReveal.js'

// Track which section is currently visible (used by AppNav for active link)
const { activeSection, isScrolled, scrollToTop } = useScrollSpy([
  'home',
  'about',
  'experience',
  'skills',
  'projects',
  'research',
  'exploring',
  'contact',
])

// Wire up scroll-reveal for all .reveal / .reveal-left elements
useScrollReveal()
</script>

<template>
  <div
    class="min-h-screen overflow-x-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans selection:bg-violet-200 dark:selection:bg-violet-900 transition-colors duration-300"
  >
    <AppNav :active-section="activeSection" />

    <!-- pt-16 offsets the fixed navbar height -->
    <main class="pt-16">
      <HeroSection />
      <AboutSection />
      <ExperienceTimeline />
      <SkillsSection />
      <ProjectsSection />
      <ResearchSection />
      <ExploringSection />
      <ContactSection />
    </main>

    <KittenCompanion />

    <!-- Scroll-to-top button -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-75 translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-75 translate-y-4"
    >
      <button
        v-if="isScrolled"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 z-40 p-3.5 bg-gradient-to-br from-violet-600 to-blue-500 text-white rounded-full shadow-xl shadow-violet-300/40 dark:shadow-violet-900/50 hover:shadow-2xl hover:shadow-violet-400/50 hover:-translate-y-1 active:scale-90 transition-all"
        aria-label="Scroll to top"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </Transition>
  </div>
</template>