<script setup>
import { workExperience } from '../data/timeline.js'
</script>

<template>
  <section
    id="experience"
    class="bg-slate-100/50 dark:bg-slate-900/50 py-20 sm:py-24 border-y border-slate-200 dark:border-slate-800 transition-colors duration-300 w-full"
  >
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <!-- Section header -->
      <div class="text-center mb-14 sm:mb-18 reveal">
        <span
          class="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 rounded-full border border-blue-200 dark:border-blue-800/40 uppercase"
        >
          <!-- Briefcase SVG -->
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          Career
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          Work Experience
        </h2>
        <p class="mt-3 text-slate-500 dark:text-slate-500 max-w-md mx-auto text-sm sm:text-base">
          A chronological timeline of my professional roles and engineering positions.
        </p>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Vertical line -->
        <div
          class="absolute left-5 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800"
          aria-hidden="true"
        ></div>

        <!-- Timeline entries -->
        <div class="space-y-12">
          <div
            v-for="(job, index) in workExperience"
            :key="job.company"
            class="reveal relative flex items-start gap-6 md:gap-0"
            :style="{ transitionDelay: `${index * 80}ms` }"
          >
            <!-- Left content (desktop only) — odd entries show content here -->
            <div
              class="hidden md:block w-1/2 pr-10"
              :class="index % 2 === 0 ? 'text-right' : 'opacity-0 pointer-events-none'"
            >
              <div v-if="index % 2 === 0" class="inline-block text-left md:text-right">
                <span
                  class="inline-block px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-full border bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/40 mb-2"
                >
                  {{ job.period }}
                </span>
                <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1">{{ job.role }}</h3>
                <p class="text-sm font-semibold text-violet-600 dark:text-violet-400 mb-2">{{ job.company }}</p>
                <p class="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{{ job.description }}</p>
                <!-- Tech tags -->
                <div class="flex flex-wrap gap-1.5 justify-start md:justify-end">
                  <span
                    v-for="t in job.tech"
                    :key="t"
                    class="px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-200/50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300/40 dark:border-slate-700/40"
                  >
                    {{ t }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Center dot -->
            <div
              class="absolute left-5 md:left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
            >
              <div
                class="w-4 h-4 rounded-full border-[3px] border-white dark:border-slate-950 shadow-md bg-blue-500"
              ></div>
            </div>

            <!-- Right content (desktop) — even entries show content here -->
            <div
              class="hidden md:block w-1/2 pl-10"
              :class="index % 2 !== 0 ? '' : 'opacity-0 pointer-events-none'"
            >
              <div v-if="index % 2 !== 0">
                <span
                  class="inline-block px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-full border bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/40 mb-2"
                >
                  {{ job.period }}
                </span>
                <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1">{{ job.role }}</h3>
                <p class="text-sm font-semibold text-violet-600 dark:text-violet-400 mb-2">{{ job.company }}</p>
                <p class="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{{ job.description }}</p>
                <!-- Tech tags -->
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="t in job.tech"
                    :key="t"
                    class="px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-200/50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300/40 dark:border-slate-700/40"
                  >
                    {{ t }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Mobile content (always left-aligned) -->
            <div class="md:hidden pl-10 flex-1">
              <span
                class="inline-block px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-full border bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/40 mb-2"
              >
                {{ job.period }}
              </span>
              <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1">{{ job.role }}</h3>
              <p class="text-sm font-semibold text-violet-600 dark:text-violet-400 mb-2">{{ job.company }}</p>
              <p class="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{{ job.description }}</p>
              <!-- Tech tags -->
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="t in job.tech"
                  :key="t"
                  class="px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-200/50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300/40 dark:border-slate-700/40"
                >
                  {{ t }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
