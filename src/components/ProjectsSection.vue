<script setup>
import { projects, techColorClasses } from '../data/projects.js'

function getTechClasses(color) {
  return techColorClasses[color] ?? techColorClasses.violet
}
</script>

<template>
  <section
    id="projects"
    class="w-full max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24"
  >
    <!-- Section header -->
    <div class="text-center mb-12 sm:mb-16 reveal">
      <span
        class="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 rounded-full border border-violet-200 dark:border-violet-800/40 uppercase"
      >
        My Work
      </span>
      <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
        Significant Works
      </h2>
      <p class="text-slate-500 dark:text-slate-500 max-w-md mx-auto text-sm sm:text-base">
        A collection of academic, professional, and personal projects.
      </p>
    </div>

    <!-- Project grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
      <div
        v-for="(project, index) in projects"
        :key="project.title"
        class="reveal group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-slate-900/80 hover:-translate-y-3 transition-all duration-500 flex flex-col w-full"
        :style="{ transitionDelay: `${index * 60}ms` }"
      >
        <!-- Image / preview -->
        <div
          class="aspect-video bg-slate-100 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center"
        >
          <img
            v-if="project.image"
            :src="project.image"
            :alt="project.title"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <!-- Gradient color overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-30 dark:group-hover:opacity-50 transition-all duration-500"
            :class="project.gradient"
          ></div>
          <!-- Subtle always-on dark overlay in dark mode -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 dark:opacity-40 group-hover:opacity-60 dark:group-hover:opacity-70 transition-opacity duration-500"
          ></div>
          <span
            v-if="!project.image"
            class="text-slate-400 dark:text-slate-500 font-medium"
          >
            Project Preview
          </span>

          <!-- Status badge (if project is in progress) -->
          <div
            v-if="project.status"
            class="absolute top-3 right-3 px-2.5 py-1 bg-amber-400/90 text-amber-950 text-[10px] font-bold rounded-full uppercase tracking-wider shadow"
          >
            {{ project.status }}
          </div>
        </div>

        <!-- Card body -->
        <div class="p-6 sm:p-7 flex flex-col flex-1">
          <h3
            class="text-xl sm:text-2xl font-bold mb-2.5 text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors"
          >
            {{ project.title }}
          </h3>

          <p
            class="text-sm sm:text-base text-slate-500 dark:text-slate-400 mb-5 line-clamp-2 leading-relaxed flex-1"
          >
            {{ project.description }}
          </p>

          <!-- Colored tech tags -->
          <div class="flex flex-wrap gap-2 mb-5">
            <span
              v-for="t in project.tech"
              :key="t"
              class="px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-bold rounded-full border uppercase tracking-wider transition-all duration-200 hover:scale-105"
              :class="getTechClasses(project.techColor)"
            >
              {{ t }}
            </span>
          </div>

          <!-- View link -->
          <a
            :href="project.link"
            :target="project.link !== '#' ? '_blank' : undefined"
            rel="noopener noreferrer"
            class="group/link inline-flex items-center gap-1.5 text-sm font-bold text-violet-600 dark:text-violet-400 hover:gap-3 transition-all duration-300 w-max"
          >
            View Project
            <svg class="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
