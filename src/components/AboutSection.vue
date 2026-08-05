<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue'
import { education, certifications } from '../data/timeline.js'

const LocationGlobe3D = defineAsyncComponent(() => import('./LocationGlobe3D.vue'))

const isDesktop = ref(false)

onMounted(() => {
  isDesktop.value = window.matchMedia('(pointer: fine)').matches
})

const activeTab = ref(null)

const selectCategory = (tabId) => {
  if (activeTab.value === tabId) {
    activeTab.value = null
  } else {
    activeTab.value = tabId
  }
}

const categories = [
  {
    id: 'education',
    title: 'Education',
    shortTitle: 'Education',
    badgeClass: 'bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800/40',
    activeBorder: 'border-violet-500 dark:border-violet-400 bg-violet-50/80 dark:bg-violet-950/50 shadow-md shadow-violet-500/10',
    iconPath: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
  },
  {
    id: 'certifications',
    title: 'Certifications',
    shortTitle: 'Certifications',
    badgeClass: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40',
    activeBorder: 'border-emerald-500 dark:border-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/50 shadow-md shadow-emerald-500/10',
    iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    id: 'achievements',
    title: 'Key Achievements',
    shortTitle: 'Achievements',
    badgeClass: 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/40',
    activeBorder: 'border-amber-500 dark:border-amber-400 bg-amber-50/80 dark:bg-amber-950/50 shadow-md shadow-amber-500/10',
    iconPath: 'M5 3h14M9 3v2a3 3 0 003 3v0a3 3 0 003-3V3M5 3a2 2 0 00-2 2v1a4 4 0 004 4h0M19 3a2 2 0 012 2v1a4 4 0 01-4 4h0M12 8v5m-3 6h6a1 1 0 001-1v-1a3 3 0 00-3-3v0a3 3 0 00-3 3v1a1 1 0 001 1z',
  },
  {
    id: 'extracurriculars',
    title: 'Extracurriculars',
    shortTitle: 'Activities',
    badgeClass: 'bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800/40',
    activeBorder: 'border-sky-500 dark:border-sky-400 bg-sky-50/80 dark:bg-sky-950/50 shadow-md shadow-sky-500/10',
    iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  },
]

const achievements = [
  {
    title: 'Champion',
    sub: 'MU CSE FEST 2024 — Design',
    desc: 'Won 1st place out of 50+ participants solving user experience challenges under strict constraints.',
    icon: '🏆',
  },
  {
    title: 'Finalist',
    sub: 'Intra MU Programming Contest 2025',
    desc: 'Qualified as finalist in competitive algorithm and data structure challenges.',
    icon: '⚡',
  },
  {
    title: 'Scholar',
    sub: 'Double Board Scholarships',
    desc: 'Awarded government honors for academic board exam accomplishments.',
    icon: '🎓',
  },
]

const extracurriculars = [
  {
    role: 'Executive Member',
    club: 'MU Robotics Club',
    desc: 'Coordinating hardware prototyping, microcontrollers, and robotics operations.',
    badgeColor: 'bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800/40',
  },
  {
    role: 'Design Secretary',
    club: 'MU Islamic Society',
    desc: 'Led visual campaigns, branding identity, and event logistics for Seerah Conference 2025.',
    badgeColor: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40',
  },
  {
    role: 'General Member',
    club: 'CSE Society & Geography Society',
    desc: 'Volunteered for CSE Fest 2023 workshops, hackathons, and regional field events.',
    badgeColor: 'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800/40',
  },
]
</script>

<template>
  <section
    id="about"
    class="bg-slate-100/50 dark:bg-slate-900/50 py-20 sm:py-24 border-y border-slate-200 dark:border-slate-800 transition-colors duration-300 w-full"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <!-- Top Row: Left (Location & Bento Photo Grid) | Right (Who I Am Header & Intro) -->
      <div class="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        
        <!-- Left: Location Card & Pictures Bento Grid -->
        <div class="w-full lg:w-1/2 reveal">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <!-- Location Card -->
            <div class="rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden bg-slate-900 text-white min-h-[160px] border border-slate-800 shadow-md">
              <div class="absolute top-0 right-0 w-24 h-24 bg-violet-500/20 blur-2xl rounded-full -mr-8 -mt-8"></div>
              
              <div v-if="isDesktop" class="absolute right-[-25px] top-1/2 -translate-y-1/2 w-36 h-36 pointer-events-none opacity-90 z-0">
                <LocationGlobe3D />
              </div>

              <div class="relative z-10 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-violet-400">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span class="text-[8px] font-black uppercase tracking-[0.25em] text-slate-400">Location</span>
              </div>
              <div class="relative z-10 mt-auto">
                <h3 class="text-base font-black uppercase tracking-tight text-white mb-0.5">Sylhet, BD</h3>
                <p class="text-[9px] font-bold tracking-widest text-slate-400">24.9045° N, 91.8611° E</p>
              </div>
            </div>

            <!-- Profile Image Card -->
            <div class="relative min-h-[160px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm group">
              <img
                src="/niyaz.jpg"
                alt="Niyaz Ahmad Khan - Software Engineer and Machine Learning Researcher"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4">
                <span class="text-[8px] font-black uppercase tracking-[0.2em] text-violet-400">Photo</span>
                <h4 class="text-xs font-black text-white uppercase tracking-wider">Niyaz Ahmad Khan</h4>
              </div>
            </div>

            <!-- Workspace Image Card -->
            <div class="relative h-[160px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm group bg-slate-100 dark:bg-slate-950">
              <img
                src="/1.jpeg"
                alt="Niyaz Ahmad Khan at MU CSE Fest Competition"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 dark:opacity-70 group-hover:opacity-100"
                onerror="this.src='https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=600'"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4">
                <span class="text-[8px] font-black uppercase tracking-[0.2em] text-blue-400">Glimpse</span>
                <h4 class="text-xs font-black text-white uppercase tracking-wider">Competition</h4>
              </div>
            </div>

            <!-- Event Image Card -->
            <div class="relative h-[160px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm group bg-slate-100 dark:bg-slate-950">
              <img
                src="/2.jpeg"
                alt="Niyaz Ahmad Khan - MU CSE Fest Champion Award"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 dark:opacity-75 group-hover:opacity-100"
                onerror="this.src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4">
                <span class="text-[8px] font-black uppercase tracking-[0.2em] text-amber-400">Key Moments</span>
                <h4 class="text-xs font-black text-white uppercase tracking-wider">MU CSE FEST Champion</h4>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Who I Am Header & Intro Text -->
        <div class="w-full lg:w-1/2 reveal">
          <span
            class="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 rounded-full border border-violet-200 dark:border-violet-800/40 uppercase"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Who I Am
          </span>

          <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2.5">
            About Me
          </h2>
          <h3 class="text-base sm:text-lg font-bold text-violet-600 dark:text-violet-400 mb-5">
            Engineer &amp; Researcher in Sylhet, Bangladesh
          </h3>
          <div class="h-1.5 w-20 bg-gradient-to-r from-violet-600 to-blue-500 rounded-full mb-7"></div>

          <!-- Clean Semantic Entity Block -->
          <div class="pl-5 border-l-4 border-violet-500 dark:border-violet-400 mb-8">
            <p class="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-[1.6]">
              I'm a software engineer and ML researcher based in Sylhet, Bangladesh. My research focuses on synthetic data reliability and NLP evaluation bias. I have developed SLTE, a framework for correcting label corruption in CTGAN-generated data (published on EFAST 2026, Scopus-indexed), alongside ongoing work in machine translation. I also build and deploy full-stack web applications using Vue.js and Node.js.
            </p>
          </div>
        </div>

      </div>

      <!-- 4 Simple Logo + Title Type Buttons (Mobile Responsive Auto-fit & Short Title) -->
      <div class="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8">
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="selectCategory(cat.id)"
          :class="[
            'p-3 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center gap-2.5 sm:gap-3.5 cursor-pointer text-left group select-none min-w-0 overflow-hidden',
            activeTab === cat.id
              ? cat.activeBorder
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 hover:-translate-y-0.5 hover:shadow-sm'
          ]"
        >
          <div
            :class="[
              'w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border shrink-0 transition-transform duration-300 group-hover:scale-105',
              cat.badgeClass
            ]"
          >
            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" :d="cat.iconPath"/>
            </svg>
          </div>
          <span class="text-xs sm:text-base font-extrabold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-tight truncate">
            <span class="inline sm:hidden">{{ cat.shortTitle }}</span>
            <span class="hidden sm:inline">{{ cat.title }}</span>
          </span>
        </button>
      </div>

      <!-- Detailed Info Container (Blurred until clicking any button above) -->
      <div class="relative w-full rounded-3xl overflow-hidden min-h-[200px]">
        
        <!-- Glassmorphism Blur Prompt Overlay when activeTab is null -->
        <div
          v-if="!activeTab"
          class="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-900/10 dark:bg-slate-950/20 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 rounded-3xl text-center transition-all duration-500"
        >
          <div class="p-3 bg-white/90 dark:bg-slate-900/90 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 text-violet-600 dark:text-violet-400 mb-3 animate-pulse">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/>
            </svg>
          </div>
          <h4 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Click any category button above to reveal details
          </h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Explore Education, Certifications, Key Achievements &amp; Extracurriculars
          </p>
        </div>

        <!-- Detailed Info Display Area -->
        <div
          :class="[
            'transition-all duration-500 w-full',
            !activeTab ? 'filter blur-md opacity-30 pointer-events-none select-none' : 'filter-none blur-0 opacity-100 pointer-events-auto'
          ]"
        >
          <!-- Education Detail -->
          <div
            v-if="activeTab === 'education' || !activeTab"
            class="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-violet-200 dark:border-violet-900/40 rounded-3xl shadow-lg shadow-violet-500/5"
          >
            <div class="flex items-center gap-3 mb-6">
              <div class="p-3 bg-violet-100 dark:bg-violet-950/60 rounded-2xl border border-violet-200 dark:border-violet-800/50 text-violet-600 dark:text-violet-400 shrink-0">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                </svg>
              </div>
              <div>
                <span class="text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest block">Academic Background</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">Education &amp; Academic Honors</h3>
              </div>
            </div>

            <div
              v-for="edu in education"
              :key="edu.degree"
              class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div class="space-y-2 max-w-2xl">
                <span class="inline-block px-3 py-1 text-xs font-bold rounded-full bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800/40">
                  {{ edu.period }}
                </span>
                <h4 class="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  {{ edu.degree }}
                </h4>
                <p class="text-sm font-bold text-violet-600 dark:text-violet-400">
                  {{ edu.institution }}
                </p>
                <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
                  {{ edu.description }}
                </p>
              </div>

              <div class="shrink-0 flex flex-wrap md:flex-col gap-2">
                <span class="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                  Full-Stack Architecture
                </span>
                <span class="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                  Machine Learning &amp; AI
                </span>
                <span class="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                  Competitive Coding
                </span>
              </div>
            </div>
          </div>

          <!-- Certifications Detail -->
          <div
            v-if="activeTab === 'certifications'"
            class="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/40 rounded-3xl shadow-lg shadow-emerald-500/5"
          >
            <div class="flex items-center gap-3 mb-6">
              <div class="p-3 bg-emerald-100 dark:bg-emerald-950/60 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400 shrink-0">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <div>
                <span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">Verified Credentials</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">Technical Certifications</h3>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                v-for="cert in certifications"
                :key="cert.name"
                class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-700 transition-all flex items-start gap-4 shadow-sm hover:shadow"
              >
                <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 shrink-0">
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" :d="cert.iconPath"/>
                  </svg>
                </div>
                <div>
                  <span class="text-[10px] font-extrabold uppercase tracking-wider text-emerald-650 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800/40">
                    {{ cert.issuer }}
                  </span>
                  <h4 class="text-base font-bold text-slate-900 dark:text-white mt-1.5 leading-snug">
                    {{ cert.name }}
                  </h4>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                    Verified Certificate
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Achievements Detail -->
          <div
            v-if="activeTab === 'achievements'"
            class="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/40 rounded-3xl shadow-lg shadow-amber-500/5"
          >
            <div class="flex items-center gap-3 mb-6">
              <div class="p-3 bg-amber-100 dark:bg-amber-950/60 rounded-2xl border border-amber-200 dark:border-amber-800/50 text-amber-600 dark:text-amber-400 shrink-0">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 3h14M9 3v2a3 3 0 003 3v0a3 3 0 003-3V3M5 3a2 2 0 00-2 2v1a4 4 0 004 4h0M19 3a2 2 0 012 2v1a4 4 0 01-4 4h0M12 8v5m-3 6h6a1 1 0 001-1v-1a3 3 0 00-3-3v0a3 3 0 00-3 3v1a1 1 0 001 1z"/>
                </svg>
              </div>
              <div>
                <span class="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest block">Honors &amp; Awards</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">Key Achievements</h3>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div
                v-for="ach in achievements"
                :key="ach.sub"
                class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between hover:border-amber-400 dark:hover:border-amber-700 transition-all shadow-sm hover:shadow"
              >
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <span class="px-2.5 py-1 text-xs font-black uppercase tracking-wider rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
                      {{ ach.title }}
                    </span>
                    <span class="text-2xl">{{ ach.icon }}</span>
                  </div>
                  <h4 class="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                    {{ ach.sub }}
                  </h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {{ ach.desc }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Extracurriculars Detail -->
          <div
            v-if="activeTab === 'extracurriculars'"
            class="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-900/40 rounded-3xl shadow-lg shadow-sky-500/5"
          >
            <div class="flex items-center gap-3 mb-6">
              <div class="p-3 bg-sky-100 dark:bg-sky-950/60 rounded-2xl border border-sky-200 dark:border-sky-800/50 text-sky-600 dark:text-sky-400 shrink-0">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <div>
                <span class="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest block">Leadership &amp; Clubs</span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">Extracurricular Activities</h3>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div
                v-for="act in extracurriculars"
                :key="act.club"
                class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between hover:border-sky-400 dark:hover:border-sky-700 transition-all shadow-sm hover:shadow"
              >
                <div>
                  <span :class="['px-2.5 py-1 text-xs font-black uppercase tracking-wider rounded-lg border inline-block mb-3', act.badgeColor]">
                    {{ act.role }}
                  </span>
                  <h4 class="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                    {{ act.club }}
                  </h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {{ act.desc }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>
