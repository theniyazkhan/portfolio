<script setup>
import { education, certifications } from '../data/timeline.js'
</script>

<template>
  <section
    id="education"
    class="bg-white dark:bg-slate-950 py-20 sm:py-24 border-y border-slate-200 dark:border-slate-800 transition-colors duration-300 w-full"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <!-- Section header -->
      <div class="text-center mb-12 sm:mb-16 reveal">
        <span
          class="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 rounded-full border border-violet-200 dark:border-violet-800/40 uppercase"
        >
          <!-- Academic cap SVG -->
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12v7a2 2 0 01-2 2h-2"/>
          </svg>
          Study & Credentials
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          Education & Certifications
        </h2>
        <p class="mt-3 text-slate-500 dark:text-slate-500 max-w-md mx-auto text-sm sm:text-base">
          My academic foundation and specialized professional credentials.
        </p>
      </div>

      <!-- Content columns -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <!-- Education column -->
        <div class="space-y-6">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 mb-2">
            <!-- Academic cap SVG -->
            <svg class="w-5 h-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
            Academic Studies
          </h3>

          <div
            v-for="(edu, index) in education"
            :key="edu.degree"
            class="reveal p-6 sm:p-8 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            :style="{ transitionDelay: `${index * 80}ms` }"
          >
            <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-600 opacity-60"></div>
            <span
              class="inline-block px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-full border bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800/40 mb-3"
            >
              {{ edu.period }}
            </span>
            <h4 class="text-lg font-bold text-slate-900 dark:text-white mb-1">
              {{ edu.degree }}
            </h4>
            <p class="text-sm font-semibold text-violet-600 dark:text-violet-400 mb-4">
              {{ edu.institution }}
            </p>
            <p class="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
              {{ edu.description }}
            </p>
          </div>
        </div>

        <!-- Certifications column -->
        <div class="space-y-6">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 mb-2">
            <!-- Badge/Award SVG -->
            <svg class="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            Certifications
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="(cert, index) in certifications"
              :key="cert.name"
              class="reveal p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-800 transition-all flex gap-3 items-start"
              :style="{ transitionDelay: `${index * 60}ms` }"
            >
              <div class="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="cert.iconPath"/>
                </svg>
              </div>
              <div>
                <h4 class="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug mb-1">
                  {{ cert.name }}
                </h4>
                <p class="text-xs font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-wide">
                  {{ cert.issuer }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
