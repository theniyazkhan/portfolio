<script setup>
import { ref } from 'vue'
import { publications, researchTagColors, defaultTagColor } from '../data/research.js'

const expandedPapers = ref({})

function togglePaper(title) {
  expandedPapers.value[title] = !expandedPapers.value[title]
}

function getTagColor(tag) {
  return researchTagColors[tag] ?? defaultTagColor
}

function getStatusClass(status) {
  if (status === 'Published' || status === 'Accepted') {
    return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40'
  } else if (status === 'Abstract Accepted') {
    return 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/40'
  } else if (status === 'Thesis Paper') {
    return 'bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800/40'
  }
  return 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/40'
}
</script>

<template>
  <section
    id="research"
    class="bg-white dark:bg-slate-950 py-20 sm:py-24 border-y border-slate-200 dark:border-slate-800 transition-colors duration-300 w-full"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <!-- Section header -->
      <div class="text-center mb-12 sm:mb-16 reveal">
        <span
          class="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 rounded-full border border-violet-200 dark:border-violet-800/40 uppercase"
        >
          <!-- Document SVG -->
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Publications
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          Research & Papers
        </h2>
        <p class="mt-3 text-slate-500 dark:text-slate-550 max-w-lg mx-auto text-sm sm:text-base">
          Academic contributions exploring web performance, frameworks, and digital marketing technologies.
        </p>
      </div>

      <!-- Research cards -->
      <div class="space-y-6">
        <article
          v-for="(paper, index) in publications"
          :key="paper.title"
          @click="togglePaper(paper.title)"
          class="reveal group relative bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden cursor-pointer"
          :style="{ transitionDelay: `${index * 80}ms` }"
        >
          <!-- Accent line -->
          <div
            class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-blue-500 opacity-60 group-hover:opacity-100 transition-opacity"
          ></div>

          <div class="flex flex-col gap-2">
            <!-- Status + Year row -->
            <div class="flex flex-wrap items-center gap-2 mb-1">
              <span
                class="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-full border"
                :class="getStatusClass(paper.status)"
              >
                {{ paper.status }}
              </span>
              <span class="text-xs text-slate-400 dark:text-slate-500 font-medium">
                {{ paper.year }}
              </span>
            </div>

            <!-- Title -->
            <h3 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1 leading-snug group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              {{ paper.title }}
            </h3>

            <!-- Authors -->
            <p class="text-sm text-slate-500 dark:text-slate-400">
              <span class="font-medium text-slate-700 dark:text-slate-300">{{ paper.authors.join(', ') }}</span>
            </p>

            <!-- Expanded details -->
            <div
              :class="[
                'transition-all duration-500 ease-in-out origin-top overflow-hidden',
                expandedPapers[paper.title] ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'
              ]"
            >
              <div class="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 space-y-4">
                <!-- Venue -->
                <div v-if="paper.venue">
                  <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-550 block mb-1">Venue / Institution</span>
                  <p class="text-sm sm:text-base text-violet-600 dark:text-violet-400 font-medium italic">
                    {{ paper.venue }}
                  </p>
                </div>

                <!-- Abstract -->
                <div v-if="paper.abstract">
                  <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-550 block mb-1">Abstract</span>
                  <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {{ paper.abstract }}
                  </p>
                </div>

                <!-- Tags & Action Buttons Row -->
                <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-2">
                  <!-- Tags -->
                  <div class="flex-1">
                    <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-550 block mb-2">Focus Areas</span>
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="tag in paper.tags"
                        :key="tag"
                        class="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full border transition-all hover:scale-105"
                        :class="getTagColor(tag)"
                      >
                        {{ tag }}
                      </span>
                    </div>
                  </div>

                  <!-- Action buttons (PDF & Code links) -->
                  <div class="flex gap-2 shrink-0" @click.stop>
                    <!-- PDF link -->
                    <a
                      v-if="paper.pdfLink"
                      :href="paper.pdfLink"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-blue-500 text-white text-sm font-semibold rounded-xl hover:from-violet-700 hover:to-blue-600 hover:-translate-y-0.5 active:scale-95 transition-all shadow-lg shadow-violet-200/40 dark:shadow-violet-900/30 cursor-pointer"
                    >
                      <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                      View PDF
                    </a>

                    <!-- Code link -->
                    <a
                      v-if="paper.codeLink"
                      :href="paper.codeLink"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl hover:border-violet-400 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 hover:-translate-y-0.5 active:scale-95 transition-all shadow-sm cursor-pointer"
                    >
                      <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                      </svg>
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Click suggestion footer -->
            <div class="mt-3 pt-3 border-t border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-bold select-none">
              <span class="inline-flex items-center gap-1.5 transition-colors group-hover:text-violet-500 dark:group-hover:text-violet-400">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ expandedPapers[paper.title] ? 'Click to collapse details' : 'Click to expand details' }}
              </span>
              
              <!-- Animated Chevron Indicator -->
              <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500 group-hover:bg-violet-50 dark:group-hover:bg-violet-950/40 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors">
                <svg
                  :class="['w-3.5 h-3.5 transform transition-transform duration-500 shrink-0', expandedPapers[paper.title] ? 'rotate-180' : '']"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
