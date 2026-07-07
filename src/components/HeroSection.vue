<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const stats = [
  { value: '6+', label: 'Projects' },
  { value: '3+', label: 'Years Coding' },
  {
    value: null,
    label: 'CSE Fest Champion',
    isTrophy: true,
  },
]

const titles = ['GTM Engineer', 'Full-Stack Developer', 'Researcher', 'Creative Designer']
const currentTitle = ref('')
const titleIndex = ref(0)
const charIndex = ref(0)
const isDeleting = ref(false)
let typingTimeout = null

function tick() {
  const fullTitle = titles[titleIndex.value]
  
  if (isDeleting.value) {
    currentTitle.value = fullTitle.substring(0, charIndex.value - 1)
    charIndex.value--
  } else {
    currentTitle.value = fullTitle.substring(0, charIndex.value + 1)
    charIndex.value++
  }
  
  let delta = 90 - Math.random() * 40
  
  if (isDeleting.value) {
    delta /= 2 // Delete faster
  }
  
  if (!isDeleting.value && currentTitle.value === fullTitle) {
    delta = 2000 // Hold at full text
    isDeleting.value = true
  } else if (isDeleting.value && currentTitle.value === '') {
    isDeleting.value = false
    titleIndex.value = (titleIndex.value + 1) % titles.length
    delta = 500 // Pause before typing next word
  }
  
  typingTimeout = setTimeout(tick, delta)
}

onMounted(() => {
  tick()
})

onUnmounted(() => {
  if (typingTimeout) clearTimeout(typingTimeout)
})
</script>

<template>
  <section id="home" class="relative w-full overflow-hidden">
    <!-- Floating gradient orbs -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div
        class="orb-1 absolute w-[520px] h-[520px] rounded-full blur-3xl -top-40 -left-40"
        style="background: radial-gradient(circle, rgba(124,58,237,0.18) 0%, rgba(59,130,246,0.10) 60%, transparent 100%)"
      ></div>
      <div
        class="orb-2 absolute w-[420px] h-[420px] rounded-full blur-3xl top-24 -right-20"
        style="background: radial-gradient(circle, rgba(6,182,212,0.14) 0%, rgba(59,130,246,0.08) 60%, transparent 100%)"
      ></div>
      <div
        class="orb-3 absolute w-[320px] h-[320px] rounded-full blur-3xl -bottom-10 left-1/3"
        style="background: radial-gradient(circle, rgba(236,72,153,0.12) 0%, rgba(124,58,237,0.08) 60%, transparent 100%)"
      ></div>
    </div>

    <div
      class="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32 flex flex-col-reverse md:flex-row items-center justify-between gap-12"
    >
      <!-- Text Content -->
      <div class="flex-1 text-center md:text-left w-full">
        <!-- Badge -->
        <div class="fade-in-up delay-100">
          <span
            class="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs sm:text-sm font-semibold tracking-wide text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800/40 rounded-full select-none"
          >
            <span class="w-2 h-2 bg-violet-500 rounded-full animate-pulse shrink-0"></span>
            <span class="inline-flex items-center">
              Specializing in&nbsp;<span class="text-violet-700 dark:text-violet-300 font-extrabold">{{ currentTitle }}</span>
              <span class="ml-0.5 border-r-2 border-violet-500 dark:border-violet-400 h-3 animate-pulse"></span>
            </span>
          </span>
        </div>

        <!-- Heading -->
        <h1
          class="fade-in-up delay-200 text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
        >
          <span class="text-slate-900 dark:text-white">Hello, from</span>
          <br class="hidden md:block" />
          <span class="gradient-text">Niyaz</span
          ><span class="text-slate-900 dark:text-white">!</span>
        </h1>

        <!-- Description -->
        <p
          class="fade-in-up delay-300 text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-2xl mx-auto md:mx-0"
        >
          A GTM engineer and full-stack developer specializing in performance-driven web platforms, data collection pipelines, and published ML/behavioral research.
        </p>

        <!-- CTA Buttons -->
        <div
          class="fade-in-up delay-400 flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-4 w-full"
        >
          <a
            href="#projects"
            class="group px-8 py-3.5 bg-gradient-to-r from-violet-600 to-blue-500 text-white rounded-xl font-semibold hover:from-violet-700 hover:to-blue-600 hover:-translate-y-1 active:scale-95 transition-all shadow-xl shadow-violet-200/60 dark:shadow-violet-900/40 hover:shadow-2xl hover:shadow-violet-300/50 dark:hover:shadow-violet-900/50 flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
          >
            View My Work
            <svg class="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </a>

          <a
            href="#skills"
            class="px-8 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl font-semibold hover:border-violet-400 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 hover:-translate-y-1 active:scale-95 transition-all shadow-sm hover:shadow-md w-full sm:w-auto text-center cursor-pointer"
          >
            Technical Skills
          </a>
        </div>

        <!-- Stats row -->
        <div
          class="fade-in-up delay-500 flex flex-wrap justify-center md:justify-start gap-8 mt-10 pt-8 border-t border-slate-200 dark:border-slate-800"
        >
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="text-center md:text-left"
          >
            <div class="text-2xl font-extrabold gradient-text flex items-center justify-center md:justify-start gap-1">
              <!-- SVG trophy for CSE Fest Champion stat, not emoji -->
              <template v-if="stat.isTrophy">
                <svg class="w-7 h-7 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 3h14M9 3v2a3 3 0 003 3v0a3 3 0 003-3V3M5 3a2 2 0 00-2 2v1a4 4 0 004 4h0M19 3a2 2 0 012 2v1a4 4 0 01-4 4h0M12 8v5m-3 6h6a1 1 0 001-1v-1a3 3 0 00-3-3v0a3 3 0 00-3 3v1a1 1 0 001 1z"/>
                </svg>
              </template>
              <template v-else>{{ stat.value }}</template>
            </div>
            <div class="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-wider mt-0.5">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>

      <!-- Avatar -->
      <div
        class="flex-1 flex justify-center md:justify-end fade-in-up delay-500 w-full shrink-0"
      >
        <div class="relative">
          <!-- Animated spinning gradient ring -->
          <div
            class="absolute -inset-[5px] rounded-full bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 opacity-90"
            style="animation: ring-spin 6s linear infinite"
          ></div>
          <!-- Inner white gap -->
          <div
            class="absolute -inset-[2px] rounded-full bg-slate-50 dark:bg-slate-950"
          ></div>
          <!-- Photo -->
          <img
            src="/me.jpg"
            alt="Niyaz Ahmad Khan"
            class="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full object-cover shadow-2xl hover:scale-105 transition-transform duration-500 z-10"
          />
          <!-- Availability badge -->
          <div
            class="absolute -bottom-3 -right-3 z-20 bg-white dark:bg-slate-900 rounded-2xl px-3 py-2 shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-2"
          >
            <span class="relative flex h-2.5 w-2.5">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"
              ></span>
            </span>
            <div>
              <div class="text-xs font-bold text-slate-900 dark:text-white">Available</div>
              <div class="text-[10px] text-emerald-500 font-medium">for hire</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes ring-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 220ms; }
.delay-300 { animation-delay: 360ms; }
.delay-400 { animation-delay: 500ms; }
.delay-500 { animation-delay: 650ms; }
</style>
