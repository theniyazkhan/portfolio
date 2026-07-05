<script setup>
import { expertise } from '../data/expertise.js'
</script>

<template>
  <section
    id="skills"
    class="bg-white dark:bg-slate-950 py-20 sm:py-24 border-y border-slate-200 dark:border-slate-800 transition-colors duration-300 w-full"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <!-- Section header -->
      <div class="text-center mb-12 sm:mb-16 reveal">
        <span
          class="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 rounded-full border border-blue-200 dark:border-blue-800/40 uppercase"
        >
          What I Know
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          Technical Expertise
        </h2>
        <p class="mt-3 text-slate-500 dark:text-slate-500 max-w-md mx-auto text-sm sm:text-base">
          A curated set of tools and technologies I use to build great products.
        </p>
      </div>

      <!-- Skill cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full">
        <div
          v-for="(group, index) in expertise"
          :key="group.category"
          class="reveal group relative p-6 sm:p-8 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col w-full overflow-hidden"
          :style="{ transitionDelay: `${index * 80}ms` }"
        >
          <!-- Colored top gradient bar -->
          <div
            class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-80"
            :class="`${group.gradientFrom} ${group.gradientTo}`"
          ></div>

          <!-- Icon + category -->
          <div class="flex items-center gap-3 mb-2">
            <div
              class="p-2.5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 group-hover:scale-110 transition-transform duration-300"
              :class="group.iconBg"
              v-html="group.icon"
            ></div>
            <div>
              <h3
                class="text-xs sm:text-sm font-bold uppercase tracking-widest"
                :class="group.headerColor"
              >
                {{ group.category }}
              </h3>
              <p class="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                {{ group.description }}
              </p>
            </div>
          </div>

          <!-- Divider -->
          <div class="my-5 border-t border-slate-200 dark:border-slate-800"></div>

          <!-- Skill tags -->
          <div class="flex flex-wrap gap-2 sm:gap-2.5">
            <span
              v-for="skill in group.skills"
              :key="skill"
              class="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-xl border hover:scale-105 hover:-translate-y-0.5 transition-all duration-200 cursor-default shadow-sm"
              :class="`${group.tagBg} ${group.tagText} ${group.tagBorder} ${group.tagHoverBg}`"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
