<script setup>
import { ref } from 'vue'
import { skillCategories } from '../data/expertise.js'

const activeTab = ref(skillCategories[0].id)

const setActiveTab = (tabId) => {
  activeTab.value = tabId
}

const activeCategory = () => {
  return skillCategories.find(cat => cat.id === activeTab.value) || skillCategories[0]
}
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

      <!-- Tabbed Category Switcher -->
      <div class="reveal mb-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 bg-slate-100/80 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
          <button
            v-for="cat in skillCategories"
            :key="cat.id"
            @click="setActiveTab(cat.id)"
            :class="[
              'flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer',
              activeTab === cat.id
                ? `${cat.activeBg} text-white shadow-lg scale-[1.02]`
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800/60',
            ]"
          >
            <span v-html="cat.icon"></span>
            <span class="hidden md:inline">{{ cat.label }}</span>
          </button>
        </div>
      </div>

      <!-- Active Tab Content Card -->
      <div class="reveal delay-100">
        <div class="relative p-6 sm:p-8 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <!-- Colored top gradient bar -->
          <div
            class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-80"
            :class="`${activeCategory().headerGradient}`"
          ></div>

          <!-- Category title -->
          <h3 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
            <span
              class="p-2 rounded-xl border border-slate-100 dark:border-slate-700/50"
              :class="`${activeCategory().iconCircleBg} ${activeCategory().iconCircleText}`"
              v-html="activeCategory().icon"
            ></span>
            {{ activeCategory().label }}
          </h3>

          <!-- Skill cards grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <div
              v-for="(skill, index) in activeCategory().skills"
              :key="skill.name"
              class="group relative p-4 bg-white dark:bg-slate-800/50 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center text-center cursor-default"
              :class="activeCategory().cardBorder"
              :style="{ transitionDelay: `${index * 60}ms` }"
            >
              <!-- Skill logo -->
              <div
                class="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300"
                :class="`${activeCategory().iconCircleBg} ${activeCategory().iconCircleText}`"
                v-html="skill.logo"
              ></div>
              <!-- Skill name -->
              <h4 class="text-sm font-bold text-slate-800 dark:text-slate-200">{{ skill.name }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
