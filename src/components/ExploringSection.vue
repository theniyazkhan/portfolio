<script setup>
import { ref, onMounted } from 'vue'
import { exploringItems, categoryClasses, defaultCategoryClass } from '../data/exploring.js'

function getCategoryClass(category) {
  return categoryClasses[category] ?? defaultCategoryClass
}

/**
 * SVG progress ring configuration.
 * Using a circle with r=40, circumference = 2 * PI * 40 ≈ 251.3
 */
const CIRCUMFERENCE = 2 * Math.PI * 40

// Track whether rings should animate (triggered on scroll into view)
const animateRings = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        animateRings.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.2 }
  )

  const section = document.getElementById('exploring')
  if (section) observer.observe(section)
})

function strokeDashoffset(progress) {
  return CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE
}
</script>

<template>
  <section
    id="exploring"
    class="bg-slate-100/50 dark:bg-slate-900/50 py-20 sm:py-24 border-y border-slate-200 dark:border-slate-800 transition-colors duration-300 w-full"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <!-- Section header -->
      <div class="text-center mb-12 sm:mb-16 reveal">
        <span
          class="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 rounded-full border border-emerald-200 dark:border-emerald-800/40 uppercase"
        >
          <!-- Compass/explore SVG -->
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
          </svg>
          Growth Mindset
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          Currently Exploring
        </h2>
        <p class="mt-3 text-slate-500 dark:text-slate-500 max-w-lg mx-auto text-sm sm:text-base">
          Technologies and concepts I'm actively learning to expand my engineering toolkit.
        </p>
      </div>

      <!-- Exploring grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(item, index) in exploringItems"
          :key="item.name"
          class="reveal group relative bg-white dark:bg-slate-900/80 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden"
          :style="{ transitionDelay: `${index * 60}ms` }"
        >
          <div class="flex items-start gap-4">
            <!-- SVG Progress ring -->
            <div class="relative shrink-0 w-16 h-16">
              <svg class="w-16 h-16 -rotate-90" viewBox="0 0 100 100">
                <!-- Background circle -->
                <circle
                  cx="50" cy="50" r="40"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="6"
                  class="text-slate-200 dark:text-slate-800"
                />
                <!-- Progress circle -->
                <circle
                  cx="50" cy="50" r="40"
                  fill="none"
                  stroke="url(#progressGradient)"
                  stroke-width="6"
                  stroke-linecap="round"
                  :stroke-dasharray="CIRCUMFERENCE"
                  :stroke-dashoffset="animateRings ? strokeDashoffset(item.progress) : CIRCUMFERENCE"
                  class="transition-all duration-1000 ease-out"
                  :style="{ transitionDelay: `${index * 120 + 300}ms` }"
                />
                <!-- Gradient definition -->
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#7c3aed" />
                    <stop offset="100%" stop-color="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              <!-- Percentage label -->
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {{ item.progress }}%
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <!-- Category badge -->
              <span
                class="inline-flex px-2 py-0.5 mb-2 text-[10px] font-bold uppercase tracking-wider rounded-full border"
                :class="getCategoryClass(item.category)"
              >
                {{ item.category }}
              </span>

              <h3 class="text-base font-bold text-slate-900 dark:text-white mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors truncate">
                {{ item.name }}
              </h3>

              <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                {{ item.description }}
              </p>
            </div>
          </div>

          <!-- Icon watermark bottom-right -->
          <div class="absolute -bottom-2 -right-2 opacity-[0.04] dark:opacity-[0.06] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
            <svg class="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" :d="item.svgPath"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
