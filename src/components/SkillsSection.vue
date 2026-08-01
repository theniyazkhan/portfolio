<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { allSkillsList, skillCategories } from '../data/expertise.js'

const activeTab = ref('languages')
const sliderRef = ref(null)
const activeIndex = ref(0)
const isPaused = ref(false)

// Duplicate skills array 3 times for a 100% seamless infinite scroll loop
const displaySkillsList = computed(() => [
  ...allSkillsList,
  ...allSkillsList,
  ...allSkillsList,
])

let animationFrameId = null
let pauseTimeout = null

// Continuous auto-sliding ticker speed (pixels per frame)
const speed = 0.85

const tick = () => {
  if (sliderRef.value && !isPaused.value && !isDragging) {
    const el = sliderRef.value
    el.scrollLeft += speed

    // Calculate single set width (1/3 of total scrollable width)
    const singleSetWidth = el.scrollWidth / 3

    // Seamless infinite loop reset without any visual jump
    if (el.scrollLeft >= singleSetWidth * 2) {
      el.scrollLeft -= singleSetWidth
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += singleSetWidth
    }

    updateCenterHighlight()
  }
  animationFrameId = requestAnimationFrame(tick)
}

const pauseAutoSlide = (delay = 0) => {
  isPaused.value = true
  if (pauseTimeout) clearTimeout(pauseTimeout)
  if (delay > 0) {
    pauseTimeout = setTimeout(() => {
      isPaused.value = false
    }, delay)
  }
}

const resumeAutoSlide = () => {
  if (pauseTimeout) clearTimeout(pauseTimeout)
  isPaused.value = false
}

// Next / Prev buttons
const nextSlide = () => {
  pauseAutoSlide(3500)
  const nextIdx = (activeIndex.value + 1) % allSkillsList.length
  goToSlide(nextIdx)
}

const prevSlide = () => {
  pauseAutoSlide(3500)
  const prevIdx = (activeIndex.value - 1 + allSkillsList.length) % allSkillsList.length
  goToSlide(prevIdx)
}

const goToSlide = (realIndex) => {
  if (!sliderRef.value) return
  activeIndex.value = realIndex
  const skill = allSkillsList[realIndex]
  if (skill) {
    activeTab.value = skill.category
  }
  // Target item in middle set of duplicated array (index + allSkillsList.length)
  const targetChildIndex = realIndex + allSkillsList.length
  scrollToChildIndex(targetChildIndex)
}

const scrollToChildIndex = (childIndex) => {
  if (!sliderRef.value) return
  const container = sliderRef.value
  const child = container.children[childIndex]
  if (child) {
    const targetLeft = child.offsetLeft - container.clientWidth / 2 + child.offsetWidth / 2
    container.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: 'smooth',
    })
  }
}

const selectCategoryTab = (tabId) => {
  pauseAutoSlide(4500)
  const realIndex = allSkillsList.findIndex(skill => skill.category === tabId)
  if (realIndex !== -1) {
    activeTab.value = tabId
    goToSlide(realIndex)
  }
}

const updateCenterHighlight = () => {
  if (!sliderRef.value || isDragging) return
  const container = sliderRef.value
  const containerCenter = container.scrollLeft + container.clientWidth / 2

  let closestChildIndex = 0
  let minDistance = Infinity

  const children = container.children
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    const childCenter = child.offsetLeft + child.offsetWidth / 2
    const distance = Math.abs(containerCenter - childCenter)

    if (distance < minDistance) {
      minDistance = distance
      closestChildIndex = i
    }
  }

  const realIndex = closestChildIndex % allSkillsList.length
  if (activeIndex.value !== realIndex) {
    activeIndex.value = realIndex
    const currentSkill = allSkillsList[realIndex]
    if (currentSkill && !isPaused.value) {
      activeTab.value = currentSkill.category
    }
  }
}

// Drag functionality
let isDragging = false
let startX = 0
let scrollLeft = 0

const startDrag = (e) => {
  pauseAutoSlide()
  isDragging = true
  if (sliderRef.value) {
    sliderRef.value.classList.add('cursor-grabbing')
    startX = (e.pageX || e.touches[0].pageX) - sliderRef.value.offsetLeft
    scrollLeft = sliderRef.value.scrollLeft
  }
}

const stopDrag = () => {
  if (isDragging) {
    isDragging = false
    if (sliderRef.value) {
      sliderRef.value.classList.remove('cursor-grabbing')
    }
    pauseAutoSlide(2000)
  }
}

const onDrag = (e) => {
  if (!isDragging || !sliderRef.value) return
  e.preventDefault()
  const x = (e.pageX || e.touches[0].pageX) - sliderRef.value.offsetLeft
  const walk = (x - startX) * 1.5
  sliderRef.value.scrollLeft = scrollLeft - walk
  updateCenterHighlight()
}

onMounted(() => {
  nextTick(() => {
    if (sliderRef.value) {
      // Start in the middle set of the duplicated array for seamless two-way scrolling
      const singleSetWidth = sliderRef.value.scrollWidth / 3
      sliderRef.value.scrollLeft = singleSetWidth
    }
    animationFrameId = requestAnimationFrame(tick)
  })
})

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (pauseTimeout) clearTimeout(pauseTimeout)
})
</script>

<template>
  <section
    id="skills"
    class="bg-white dark:bg-slate-950 py-20 sm:py-24 border-y border-slate-200 dark:border-slate-800 transition-colors duration-300 w-full overflow-hidden"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <!-- Section header -->
      <div class="text-center mb-10 sm:mb-14 reveal">
        <span
          class="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 rounded-full border border-blue-200 dark:border-blue-800/40 uppercase"
        >
          What I Know
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          Technical Expertise
        </h2>
      </div>

      <!-- Tabbed Category Switcher -->
      <div class="reveal mb-12">
        <div class="flex flex-wrap justify-center gap-2 p-1.5 bg-slate-100/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800/80 backdrop-blur-sm max-w-4xl mx-auto">
          <button
            v-for="cat in skillCategories"
            :key="cat.id"
            @click="selectCategoryTab(cat.id)"
            :aria-label="cat.label"
            :class="[
              'flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer select-none',
              activeTab === cat.id
                ? `${cat.activeBg} text-white shadow-lg shadow-violet-500/25 scale-[1.02]`
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60',
            ]"
          >
            <span v-html="cat.icon" aria-hidden="true" class="shrink-0"></span>
            <span class="whitespace-nowrap">{{ cat.label }}</span>
          </button>
        </div>
      </div>

      <!-- Sliding Carousel Wrapper -->
      <div
        class="relative reveal delay-100 max-w-5xl mx-auto px-4"
        @mouseenter="pauseAutoSlide(6000)"
        @mouseleave="resumeAutoSlide()"
      >
        <!-- Left Edge Fade Mask -->
        <div
          class="absolute left-0 top-0 bottom-0 w-20 sm:w-32 z-20 pointer-events-none bg-gradient-to-r from-white dark:from-slate-950 via-white/80 dark:via-slate-950/80 to-transparent"
        ></div>

        <!-- Right Edge Fade Mask -->
        <div
          class="absolute right-0 top-0 bottom-0 w-20 sm:w-32 z-20 pointer-events-none bg-gradient-to-l from-white dark:from-slate-950 via-white/80 dark:via-slate-950/80 to-transparent"
        ></div>

        <!-- Left Scroll Button -->
        <button
          @click="prevSlide"
          class="absolute -left-2 sm:left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer"
          aria-label="Previous Slide"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <!-- Right Scroll Button -->
        <button
          @click="nextSlide"
          class="absolute -right-2 sm:right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer"
          aria-label="Next Slide"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <!-- Slider Track Container (Infinite Duplicated List) -->
        <div
          ref="sliderRef"
          @mousedown="startDrag"
          @mouseleave="stopDrag"
          @mouseup="stopDrag"
          @mousemove="onDrag"
          @touchstart="startDrag"
          @touchend="stopDrag"
          @touchmove="onDrag"
          class="flex items-center gap-6 sm:gap-8 py-10 px-28 sm:px-44 overflow-x-auto no-scrollbar cursor-grab select-none"
        >
          <div
            v-for="(skill, index) in displaySkillsList"
            :key="`${skill.name}-${index}`"
            @click="goToSlide(index % allSkillsList.length)"
            :class="[
              'shrink-0 flex flex-col items-center justify-center p-4 sm:p-5 w-36 sm:w-44 rounded-3xl border transition-all duration-500 cursor-pointer',
              activeIndex === (index % allSkillsList.length)
                ? 'bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 scale-125 z-10 shadow-2xl'
                : 'bg-white/60 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 scale-90 opacity-60 hover:opacity-90 hover:scale-100'
            ]"
            :style="activeIndex === (index % allSkillsList.length) ? {
              boxShadow: `0 20px 35px -10px ${skill.brandColor}40, 0 0 15px 0 ${skill.brandColor}25`,
              borderColor: `${skill.brandColor}70`
            } : {}"
          >
            <!-- Logo Box -->
            <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-3 p-2 transition-transform duration-500 overflow-hidden bg-slate-100/50 dark:bg-slate-800/40 border border-slate-200/40 dark:border-slate-700/40">
              <img
                :src="skill.logoUrl"
                :alt="skill.name"
                loading="lazy"
                decoding="async"
                class="w-10 h-10 sm:w-12 sm:h-12 object-contain pointer-events-none transition-transform duration-500"
                :class="activeIndex === (index % allSkillsList.length) ? 'scale-110' : ''"
              />
            </div>

            <!-- Skill Name -->
            <span
              class="text-xs sm:text-sm font-bold text-center transition-colors duration-300 whitespace-nowrap"
              :class="activeIndex === (index % allSkillsList.length) ? 'text-slate-900 dark:text-white font-extrabold' : 'text-slate-600 dark:text-slate-400'"
            >
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
