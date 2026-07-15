<script setup>
import { ref, onMounted } from 'vue'
import { exploringItems, categoryClasses, defaultCategoryClass } from '../data/exploring.js'

function getCategoryClass(category) {
  return categoryClasses[category] ?? defaultCategoryClass
}

// Circumference of details progress ring (radius = 36)
const CIRCUMFERENCE = 2 * Math.PI * 36

const selectedItemIndex = ref(null)
const animateTree = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        animateTree.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.1 }
  )

  const section = document.getElementById('exploring')
  if (section) observer.observe(section)
})

function strokeDashoffset(progress) {
  return CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE
}

function selectItem(index) {
  selectedItemIndex.value = selectedItemIndex.value === index ? null : index
}

function resetView() {
  selectedItemIndex.value = null
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
          Interactive organic learning tree detailing the technologies and computer science fields I am currently studying.
        </p>
      </div>

      <!-- Split Screen Layout -->
      <div class="flex flex-col lg:flex-row gap-12 items-center justify-between min-h-[460px]">
        
        <!-- Left Panel: Skill Details Card -->
        <div class="w-full lg:w-5/12 flex flex-col justify-center min-h-[320px] reveal">
          <Transition
            mode="out-in"
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-4"
          >
            <!-- Default Organic Overview Card -->
            <div
              v-if="selectedItemIndex === null"
              key="default"
              class="bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-all duration-500"
            >
              <div class="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-center mb-6 animate-pulse">
                <!-- Branch/Leaf icon -->
                <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 class="text-lg font-bold text-slate-800 dark:text-white mb-2">The Interactive Learning Tree</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
                Click on any glowing <strong class="font-extrabold text-slate-900 dark:text-white">Fruit</strong> of the tree to inspect my active learning progress and explore detailed insights.
              </p>
            </div>

            <!-- Active Skill Details Card -->
            <div
              v-else
              key="details"
              class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 flex flex-col relative shadow-xl border-t-4"
              :style="{ borderTopColor: exploringItems[selectedItemIndex].color }"
            >
              <!-- Reset button top-right -->
              <button
                @click="resetView"
                class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                title="Back to Tree View"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div class="flex items-start gap-5 mb-5">
                <!-- Circular progress ring -->
                <div class="relative shrink-0 w-20 h-20">
                  <svg class="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50" cy="50" r="36"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="7"
                      class="text-slate-100 dark:text-slate-850"
                    />
                    <circle
                      cx="50" cy="50" r="36"
                      fill="none"
                      :stroke="exploringItems[selectedItemIndex].color"
                      stroke-width="7"
                      stroke-linecap="round"
                      :stroke-dasharray="CIRCUMFERENCE"
                      :stroke-dashoffset="strokeDashoffset(exploringItems[selectedItemIndex].progress)"
                      class="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <span class="text-sm font-black text-slate-800 dark:text-white">
                      {{ exploringItems[selectedItemIndex].progress }}%
                    </span>
                  </div>
                </div>

                <div class="flex-1 min-w-0">
                  <span
                    class="inline-flex px-2 py-0.5 mb-2 text-[10px] font-bold uppercase tracking-wider rounded-full border"
                    :class="getCategoryClass(exploringItems[selectedItemIndex].category)"
                  >
                    {{ exploringItems[selectedItemIndex].category }}
                  </span>
                  <h3 class="text-xl font-bold text-slate-900 dark:text-white">
                    {{ exploringItems[selectedItemIndex].name }}
                  </h3>
                </div>
              </div>

              <p class="text-sm sm:text-base text-slate-655 dark:text-slate-450 leading-relaxed mb-6">
                {{ exploringItems[selectedItemIndex].description }}
              </p>

              <!-- Reset navigation CTA -->
              <button
                @click="resetView"
                class="mt-auto px-4 py-2 border border-slate-200 dark:border-slate-750 text-xs font-bold text-slate-500 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl transition-all cursor-pointer w-max"
              >
                Collapse Details
              </button>
            </div>
          </Transition>
        </div>

        <!-- Right Panel: Interactive SVG Organic Tree -->
        <div class="w-full lg:w-7/12 flex justify-center items-center relative reveal">
          <svg
            viewBox="0 0 600 500"
            class="w-full h-auto max-w-[500px] pointer-events-auto overflow-visible"
            aria-label="SVG Interactive Learning Tree"
          >
            <!-- 1. Organic Tapering Tree Trunk -->
            <g>
              <!-- Outer filled trunk -->
              <path
                d="M 282 480 C 285 380, 292 300, 296 220 L 304 220 C 308 300, 315 380, 318 480 Z"
                fill="#5c2e0b"
              />
              <!-- Darker bark shadow overlay -->
              <path
                d="M 282 480 C 285 380, 292 300, 296 220"
                stroke="#451a03"
                stroke-width="2.5"
                fill="none"
              />
              <!-- Lighter bark highlight overlay -->
              <path
                d="M 304 220 C 308 300, 315 380, 318 480"
                stroke="#783e0e"
                stroke-width="2"
                fill="none"
              />
            </g>

            <!-- 2. Organic Branches (Draw themselves on scroll-into-view) -->
            <g fill="none" stroke-linecap="round">
              <!-- Left Branch 1 (DevOps) -->
              <path
                d="M 294 400 C 240 395, 200 390, 160 370"
                class="transition-all duration-[1400ms] ease-out"
                stroke="#5c2e0b"
                stroke-width="7"
                :stroke-dasharray="200"
                :stroke-dashoffset="animateTree ? 0 : 200"
              />
              <!-- Right Branch 1 (System Design) -->
              <path
                d="M 306 385 C 360 380, 400 375, 440 350"
                class="transition-all duration-[1400ms] ease-out"
                stroke="#5c2e0b"
                stroke-width="7"
                :stroke-dasharray="200"
                :stroke-dashoffset="animateTree ? 0 : 200"
              />

              <!-- Left Branch 2 (TS & Vue) -->
              <path
                d="M 295 300 C 240 295, 190 280, 140 260"
                class="transition-all duration-[1400ms] ease-out"
                stroke="#5c2e0b"
                stroke-width="5"
                :stroke-dasharray="200"
                :stroke-dashoffset="animateTree ? 0 : 200"
              />
              <!-- Right Branch 2 (AI & NLP) -->
              <path
                d="M 303 290 C 360 280, 410 265, 460 240"
                class="transition-all duration-[1400ms] ease-out"
                stroke="#5c2e0b"
                stroke-width="5"
                :stroke-dasharray="200"
                :stroke-dashoffset="animateTree ? 0 : 200"
              />

              <!-- Left Branch 3 (Three.js) -->
              <path
                d="M 298 220 Q 230 190, 200 150"
                class="transition-all duration-[1400ms] ease-out"
                stroke="#5c2e0b"
                stroke-width="4.5"
                :stroke-dasharray="200"
                :stroke-dashoffset="animateTree ? 0 : 200"
              />
              <!-- Right Branch 3 (Cyber Security) -->
              <path
                d="M 301 210 Q 360 170, 400 130"
                class="transition-all duration-[1400ms] ease-out"
                stroke="#5c2e0b"
                stroke-width="4.5"
                :stroke-dasharray="200"
                :stroke-dashoffset="animateTree ? 0 : 200"
              />
            </g>

            <!-- 3. Small Detailed Green Leaves Sprouting from Branches -->
            <g fill="#10b981" opacity="0.85" class="transition-opacity duration-1000" :class="animateTree ? 'opacity-100' : 'opacity-0'">
              <!-- Sprout A -->
              <path d="M 0 0 C -4 -8, -10 -4, -12 6 C -6 6, -2 4, 0 0 Z" transform="translate(240, 405) rotate(-20) scale(1.3)" />
              <!-- Sprout B -->
              <path d="M 0 0 C 4 -8, 10 -4, 12 6 C 6 6, 2 4, 0 0 Z" transform="translate(350, 395) rotate(15) scale(1.3)" />
              <!-- Sprout C -->
              <path d="M 0 0 C -4 -8, -10 -4, -12 6 C -6 6, -2 4, 0 0 Z" transform="translate(210, 305) rotate(-35) scale(1.2)" />
              <!-- Sprout D -->
              <path d="M 0 0 C 4 -8, 10 -4, 12 6 C 6 6, 2 4, 0 0 Z" transform="translate(370, 285) rotate(25) scale(1.2)" />
              <!-- Sprout E -->
              <path d="M 0 0 C -4 -8, -10 -4, -12 6 C -6 6, -2 4, 0 0 Z" transform="translate(250, 200) rotate(-40) scale(1.1)" />
              <!-- Sprout F -->
              <path d="M 0 0 C 4 -8, 10 -4, 12 6 C 6 6, 2 4, 0 0 Z" transform="translate(340, 195) rotate(30) scale(1.1)" />
              <!-- Sprout G -->
              <path d="M 0 0 C -4 -8, -10 -4, -12 6 C -6 6, -2 4, 0 0 Z" transform="translate(280, 155) rotate(-45) scale(1)" />
              <!-- Sprout H -->
              <path d="M 0 0 C 4 -8, 10 -4, 12 6 C 6 6, 2 4, 0 0 Z" transform="translate(320, 145) rotate(45) scale(1)" />
            </g>

            <!-- 4. Interactive Glossy Fruit & Label Nodes -->
            <g
              v-for="(item, index) in exploringItems"
              :key="item.name"
              @click="selectItem(index)"
              class="cursor-pointer group origin-center transition-all duration-300"
              :class="[
                animateTree ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'
              ]"
              :style="{
                transitionDelay: `${index * 120 + 600}ms`
              }"
            >
              <!-- Hanging Twig/Stem -->
              <path
                :d="`M ${item.x} ${item.y - 30} Q ${item.x + 5} ${item.y - 20}, ${item.x} ${item.y - 12}`"
                stroke="#5c2e0b"
                stroke-width="2"
                fill="none"
              />

              <!-- Glowing aura behind the active or hovered fruit -->
              <circle
                :cx="item.x"
                :cy="item.y"
                r="26"
                fill="transparent"
                :stroke="item.color"
                stroke-width="2"
                :class="[
                  selectedItemIndex === index 
                    ? 'scale-110 opacity-100 stroke-dasharray-[4,4] animate-spin'
                    : 'scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-40 transition-all duration-300'
                ]"
                class="origin-center"
                style="transform-box: fill-box;"
              />

              <!-- Detailed Apple/Fruit Geometry shape -->
              <path
                :d="`M ${item.x} ${item.y - 12} 
                     C ${item.x - 14} ${item.y - 14}, ${item.x - 18} ${item.y - 6}, ${item.x - 18} ${item.y + 6}
                     C ${item.x - 18} ${item.y + 16}, ${item.x - 8} ${item.y + 18}, ${item.x} ${item.y + 14}
                     C ${item.x + 8} ${item.y + 18}, ${item.x + 18} ${item.y + 16}, ${item.x + 18} ${item.y + 6}
                     C ${item.x + 18} ${item.y - 6}, ${item.x + 14} ${item.y - 14}, ${item.x} ${item.y - 12} Z`"
                :fill="item.color"
                class="transition-all duration-300 group-hover:scale-110 origin-center shadow-md"
                :style="{ 'transform-origin': `${item.x}px ${item.y}px` }"
              />

              <!-- Tiny green leaf attached to the stem connector -->
              <path
                :d="`M ${item.x} ${item.y - 14} C ${item.x + 5} ${item.y - 20}, ${item.x + 10} ${item.y - 19}, ${item.x + 8} ${item.y - 13} Z`"
                fill="#10b981"
                class="transition-all duration-300 group-hover:scale-110 origin-center"
                :style="{ 'transform-origin': `${item.x}px ${item.y}px` }"
              />

              <!-- Glossy reflection bubble (gives 3D appearance) -->
              <circle
                :cx="item.x - 5"
                :cy="item.y - 5"
                r="3.5"
                fill="white"
                opacity="0.5"
                class="pointer-events-none"
              />

              <!-- Visible label badges next to each fruit (left or right aligned) -->
              <g class="transition-transform duration-300 group-hover:scale-105 origin-center" :style="{ 'transform-origin': `${item.x}px ${item.y}px` }">
                <!-- Rounded rect container -->
                <rect
                  :x="item.x > 300 ? item.x + 28 : item.x - 128"
                  :y="item.y - 13"
                  width="100"
                  height="26"
                  rx="7"
                  class="fill-white dark:fill-slate-800 transition-colors duration-300 shadow-md border"
                  :class="[selectedItemIndex === index ? 'stroke-current' : 'stroke-slate-200 dark:stroke-slate-700/60']"
                  :stroke="selectedItemIndex === index ? item.color : undefined"
                  stroke-width="2.5"
                />
                <!-- Centered text -->
                <text
                  :x="item.x > 300 ? item.x + 78 : item.x - 78"
                  :y="item.y + 4"
                  text-anchor="middle"
                  class="text-[9px] fill-slate-800 dark:fill-slate-200 font-extrabold select-none pointer-events-none uppercase tracking-wider"
                  :style="{ fill: selectedItemIndex === index ? item.color : undefined }"
                >
                  {{ item.label }}
                </text>
              </g>
            </g>
          </svg>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 8s linear infinite;
}
</style>
