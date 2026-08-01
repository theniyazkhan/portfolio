<script setup>
import { ref, computed } from 'vue'
import { projects, techColorClasses } from '../data/projects.js'

function getTechClasses(color) {
  return techColorClasses[color] ?? techColorClasses.violet
}

// Filter state
const selectedCategory = ref('all') // 'all' | 'web' | 'desktop'

// Project detail modal state
const activeProject = ref(null)

// Compute project counts for filters
const counts = computed(() => {
  return {
    all: projects.length,
    web: projects.filter((p) => p.category === 'web').length,
    desktop: projects.filter((p) => p.category === 'desktop').length,
  }
})

// Filter projects based on category
const filteredProjects = computed(() => {
  return projects.filter((project) => {
    return (
      selectedCategory.value === 'all' ||
      project.category === selectedCategory.value
    )
  })
})

function openModal(project) {
  activeProject.value = project
  document.body.style.overflow = 'hidden' // Prevent scroll behind modal
}

function closeModal() {
  activeProject.value = null
  document.body.style.overflow = ''
}
</script>

<template>
  <section
    id="projects"
    class="w-full max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24"
  >
    <!-- Section header -->
    <div class="text-center mb-10 sm:mb-12 reveal">
      <span
        class="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 rounded-full border border-violet-200 dark:border-violet-800/40 uppercase"
      >
        My Work
      </span>
      <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
        Significant Works
      </h2>
    </div>

    <!-- Filter Controls -->
    <div class="mb-10 sm:mb-12 reveal flex justify-center w-full">
      <!-- Filter tabs -->
      <div class="flex items-center p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl overflow-x-auto whitespace-nowrap">
        <button
          @click="selectedCategory = 'all'"
          :class="[
            'flex-1 md:flex-none px-5 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer select-none',
            selectedCategory === 'all'
              ? 'bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          ]"
        >
          All ({{ counts.all }})
        </button>
        <button
          @click="selectedCategory = 'web'"
          :class="[
            'flex-1 md:flex-none px-5 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer select-none',
            selectedCategory === 'web'
              ? 'bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          ]"
        >
          Web Apps ({{ counts.web }})
        </button>
        <button
          @click="selectedCategory = 'desktop'"
          :class="[
            'flex-1 md:flex-none px-5 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer select-none',
            selectedCategory === 'desktop'
              ? 'bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          ]"
        >
          Desktop ({{ counts.desktop }})
        </button>
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-if="filteredProjects.length === 0"
      class="text-center py-16 reveal border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl"
    >
      <svg class="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="text-lg font-bold text-slate-700 dark:text-slate-350">No Projects Found</h3>
      <p class="text-sm text-slate-400 mt-1">Try selecting another filter category.</p>
    </div>

    <!-- Project grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
      <div
        v-for="(project, index) in filteredProjects"
        :key="project.title"
        @click="openModal(project)"
        class="reveal group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-slate-900/85 hover:-translate-y-2 transition-all duration-500 flex flex-col w-full cursor-pointer"
        :style="{ transitionDelay: `${index * 60}ms` }"
      >
        <!-- Realistic Laptop Screen Frame Mockup -->
        <div class="relative w-full mb-4">
          <!-- Screen Outer Bezel Lid -->
          <div class="bg-slate-850 dark:bg-slate-950 p-2 sm:p-3 rounded-t-2xl sm:rounded-t-3xl border border-slate-700/80 shadow-2xl relative">
            <!-- Camera Dot -->
            <div class="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-700 mx-auto mb-1.5"></div>
            
            <!-- Screen Display Area -->
            <div class="aspect-video bg-black rounded-lg sm:rounded-xl overflow-hidden relative shadow-inner group/screen">
              <img
                v-if="project.image"
                :src="project.image"
                :alt="project.title"
                loading="lazy"
                decoding="async"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <!-- Gradient color overlay -->
              <div
                class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-25 transition-all duration-500"
                :class="project.gradient"
              ></div>
              <!-- Subtle dark overlay -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500"
              ></div>
              <span
                v-if="!project.image"
                class="text-slate-400 dark:text-slate-500 font-medium text-xs flex items-center justify-center h-full"
              >
                Project Preview
              </span>

              <!-- Status badge -->
              <div
                v-if="project.status"
                class="absolute top-2.5 right-2.5 px-2.5 py-0.5 bg-amber-400/90 text-amber-950 text-[10px] font-bold rounded-full uppercase tracking-wider shadow"
              >
                {{ project.status }}
              </div>
            </div>
          </div>

          <!-- Laptop Base Hinge & Metallic Edge -->
          <div class="h-1 bg-slate-900 w-full"></div>
          <div class="h-3.5 sm:h-4 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 dark:from-slate-750 dark:via-slate-800 dark:to-slate-900 rounded-b-xl border-t border-slate-600/30 flex items-center justify-center relative shadow-md">
            <!-- Center Notch Groove -->
            <div class="w-14 sm:w-20 h-1.5 bg-slate-400 dark:bg-slate-950 rounded-b-md shadow-inner"></div>
          </div>
        </div>

        <!-- Card body -->
        <div class="px-2 flex flex-col flex-1">
          <h3
            class="text-lg sm:text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors"
          >
            {{ project.title }}
          </h3>

          <p
            class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed flex-1"
          >
            {{ project.description }}
          </p>

          <!-- Tech tags -->
          <div class="flex flex-wrap gap-1.5 mb-4">
            <span
              v-for="t in project.tech"
              :key="t"
              class="px-2 py-0.5 text-[10px] font-bold rounded-full border uppercase tracking-wider transition-all duration-200 hover:scale-105"
              :class="getTechClasses(project.techColor)"
            >
              {{ t }}
            </span>
          </div>

          <!-- View details CTA -->
          <button
            class="group/link inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400 hover:gap-2.5 transition-all duration-300 w-max cursor-pointer mt-auto"
          >
            View Details
            <svg class="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Project details modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="activeProject"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/65 backdrop-blur-md"
          @click.self="closeModal"
        >
          <!-- Modal content card -->
          <div
            class="relative w-full max-w-4xl max-h-[88vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-y-auto shadow-2xl flex flex-col transform transition-all scale-100 duration-300"
          >
            <!-- Header Laptop Banner -->
            <div class="relative w-full p-4 sm:p-6 bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-center overflow-hidden border-b border-slate-200 dark:border-slate-800">
              <!-- Close button absolute top right -->
              <button
                @click="closeModal"
                class="absolute top-4 right-4 z-20 p-2 bg-slate-900/60 hover:bg-slate-900 border border-slate-700 text-white rounded-full transition-all focus:outline-none cursor-pointer"
                aria-label="Close modal"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <!-- Laptop Frame Mockup in Modal Header -->
              <div class="w-full max-w-2xl mx-auto my-2">
                <div class="bg-slate-850 dark:bg-slate-950 p-3 sm:p-4 rounded-t-2xl sm:rounded-t-3xl border border-slate-700 shadow-2xl relative">
                  <div class="w-2 h-2 rounded-full bg-slate-900 border border-slate-700 mx-auto mb-2"></div>
                  <div class="aspect-video bg-black rounded-xl overflow-hidden relative shadow-inner">
                    <img
                      v-if="activeProject.image"
                      :src="activeProject.image"
                      :alt="activeProject.title"
                      loading="lazy"
                      decoding="async"
                      class="w-full h-full object-cover"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  </div>
                </div>
                <div class="h-1 bg-slate-900 w-full"></div>
                <div class="h-4 sm:h-5 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 dark:from-slate-750 dark:via-slate-800 dark:to-slate-900 rounded-b-xl border-t border-slate-600/30 flex items-center justify-center relative shadow-md">
                  <div class="w-16 sm:w-24 h-1.5 bg-slate-400 dark:bg-slate-950 rounded-b-md shadow-inner"></div>
                </div>
              </div>

              <!-- Title & Links below laptop in header -->
              <div class="w-full max-w-2xl mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span class="px-2.5 py-0.5 mb-1.5 inline-block text-[10px] font-bold uppercase tracking-wider rounded-full border bg-violet-950/40 text-violet-400 border-violet-800/40">
                    {{ activeProject.category === 'web' ? 'Web Application' : 'Desktop Application' }}
                  </span>
                  <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                    {{ activeProject.title }}
                  </h3>
                </div>

                <div class="flex gap-3 shrink-0">
                  <a
                    v-if="activeProject.sourceLink"
                    :href="activeProject.sourceLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                    </svg>
                    Source Code
                  </a>
                </div>
              </div>
            </div>

            <!-- Details body layout -->
            <div class="p-6 sm:p-8 overflow-y-auto space-y-8">
              <!-- Extended Description -->
              <div class="space-y-3">
                <h4 class="text-xs sm:text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  About The Project
                </h4>
                <p class="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {{ activeProject.extendedDescription }}
                </p>
              </div>

              <!-- Core Features & Tech Stack Split -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Features -->
                <div class="md:col-span-2 space-y-4">
                  <h4 class="text-xs sm:text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <svg class="w-4 h-4 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Key Features
                  </h4>
                  <ul class="space-y-2.5">
                    <li
                      v-for="feat in activeProject.features"
                      :key="feat"
                      class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-650 dark:text-slate-350"
                    >
                      <span class="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2 shrink-0"></span>
                      <span>{{ feat }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Technologies -->
                <div class="space-y-4">
                  <h4 class="text-xs sm:text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Technologies
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="t in activeProject.tech"
                      :key="t"
                      class="px-3 py-1 text-xs font-bold rounded-xl border uppercase tracking-wider shadow-sm"
                      :class="getTechClasses(activeProject.techColor)"
                    >
                      {{ t }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Key Challenge & Solution -->
              <div v-if="activeProject.challenges" class="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-6">
                <!-- Challenge block -->
                <div class="space-y-2">
                  <h5 class="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest flex items-center gap-1.5">
                    <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Key Challenge
                  </h5>
                  <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {{ activeProject.challenges }}
                  </p>
                </div>
                <!-- Solution block -->
                <div class="space-y-2">
                  <h5 class="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                    <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Solution Implemented
                  </h5>
                  <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {{ activeProject.solution }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>
