<script setup>
import { ref } from 'vue'
import { education, certifications } from '../data/timeline.js'

const activeCard = ref('education')

const toggleCard = (card) => {
  activeCard.value = activeCard.value === card ? null : card
}

const handleMouseEnter = (card) => {
  if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
    activeCard.value = card
  }
}

const handleMouseLeave = (card) => {
  if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches && activeCard.value === card) {
    activeCard.value = null
  }
}

const achievements = [
  {
    title: 'Champion',
    sub: 'MU CSE FEST 2024 — Design',
    desc: 'Won 1st place out of 50+ participants solving user experience challenges under strict constraints.',
  },
  {
    title: 'Finalist',
    sub: 'Intra MU Programming Contest 2025',
    desc: 'Qualified as finalist in competitive algorithm challenges.',
  },
  {
    title: 'Scholar',
    sub: 'Double Board Scholarships',
    desc: 'Awarded government honors for academic board exam accomplishments.',
  },
]

const extracurriculars = [
  {
    role: 'Executive Member',
    club: 'MU Robotics Club',
    desc: 'Coordinating hardware prototyping and robotics operations.',
  },
  {
    role: 'Design Secretary',
    club: 'MU Islamic Society',
    desc: 'Led visual campaigns and logistics for Seerah Conference 2025.',
  },
  {
    role: 'General Member',
    club: 'CSE Society & Geography Society',
    desc: 'Volunteered for CSE Fest 2023 workshops and field events.',
  },
]
</script>

<template>
  <section
    id="about"
    class="bg-slate-100/50 dark:bg-slate-900/50 py-20 sm:py-24 border-y border-slate-200 dark:border-slate-800 transition-colors duration-300 w-full"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <!-- Layout Container -->
      <div class="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        <!-- Left: Bento Photo & Info Grid -->
        <div class="w-full lg:w-1/2 reveal">
          <!-- Text Header -->
          <span
            class="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 rounded-full border border-violet-200 dark:border-violet-800/40 uppercase"
          >
            <!-- User SVG icon -->
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Who I Am
          </span>

          <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-5">
            About Me
          </h2>
          <div class="h-1.5 w-20 bg-gradient-to-r from-violet-600 to-blue-500 rounded-full mb-7"></div>
<!-- 
          <div class="pl-5 border-l-4 border-violet-350 dark:border-violet-800 mb-8">
            <p class="text-base sm:text-lg text-slate-650 dark:text-slate-400 italic leading-relaxed font-semibold">
              "CSE student and published researcher bridging software development, conversion engineering, and layout design."
            </p>
          </div> -->

          <!-- Symmetrical 2x2 Bento Photo Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <!-- Location Card -->
            <div class="rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden bg-slate-900 text-white min-h-[160px] border border-slate-800">
              <div class="absolute top-0 right-0 w-24 h-24 bg-violet-500/20 blur-2xl rounded-full -mr-8 -mt-8"></div>
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
                alt="Niyaz Profile"
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
                alt="Competition"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 dark:opacity-70 group-hover:opacity-100"
                onerror="this.src='https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=600'"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4">
                <span class="text-[8px] font-black uppercase tracking-[0.2em] text-blue-400">Glipmps</span>
                <h4 class="text-xs font-black text-white uppercase tracking-wider">Competition</h4>
              </div>
            </div>

            <!-- Event Image Card -->
            <div class="relative h-[160px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm group bg-slate-100 dark:bg-slate-950">
              <img
                src="/2.jpeg"
                alt="MU CSE Fest Achievement"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 dark:opacity-75 group-hover:opacity-100"
                onerror="this.src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4">
                <span class="text-[8px] font-black uppercase tracking-[0.2em] text-amber-400">Key Moments</span>
                <h4 class="text-xs font-black text-white uppercase tracking-wider">MU CSE FEST Champion</h4>
              </div>
            </div>
          </div>
        </div>        <!-- Right: Accordion Drawer Cards (Education, Certifications, Achievements, Extracurriculars) -->
        <div class="w-full lg:w-1/2 space-y-4">
          
          <!-- Education Card -->
          <div class="reveal delay-100">
            <div
              @click="toggleCard('education')"
              @mouseenter="handleMouseEnter('education')"
              @mouseleave="handleMouseLeave('education')"
              :class="[
                'p-5 bg-white dark:bg-slate-900 border rounded-3xl shadow-sm transition-all duration-500 flex flex-col w-full cursor-pointer',
                activeCard === 'education'
                  ? 'border-violet-400 dark:border-violet-850 shadow-md ring-1 ring-violet-500/10'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-750'
              ]"
            >
              <!-- Header Row -->
              <div class="flex items-center justify-between shrink-0 select-none">
                <h3 class="text-sm font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-2.5 uppercase tracking-wider">
                  <!-- Academic cap SVG -->
                  <svg class="w-5 h-5 text-violet-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                  </svg>
                  <span>Education</span>
                </h3>
                
                <div class="flex items-center gap-2 text-violet-500 dark:text-violet-400">
                  <span class="text-[10px] font-extrabold uppercase tracking-widest">
                    {{ activeCard === 'education' ? 'Collapse' : 'Expand' }}
                  </span>
                  <svg
                    :class="['w-4 h-4 text-slate-400 dark:text-slate-500 transform transition-transform duration-500 shrink-0', activeCard === 'education' ? 'rotate-180' : '']"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
              
              <!-- Expanded content -->
              <div
                :class="[
                  'transition-all duration-500 ease-in-out origin-top',
                  activeCard === 'education' ? 'max-h-[500px] opacity-100 mt-5' : 'max-h-0 opacity-0 overflow-hidden'
                ]"
              >
                <div class="space-y-4">
                  <div
                    v-for="edu in education"
                    :key="edu.degree"
                    class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex gap-3 hover:border-violet-300 dark:hover:border-violet-800 transition-colors"
                  >
                    <div class="shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-900/40 text-violet-600">
                      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                      </svg>
                    </div>
                    <div>
                      <div class="text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider mb-0.5">
                        {{ edu.period }}
                      </div>
                      <h4 class="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {{ edu.degree }}
                      </h4>
                      <p class="text-xs font-semibold text-violet-600 dark:text-violet-400 mt-0.5">
                        {{ edu.institution }}
                      </p>
                      <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                        {{ edu.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Certifications Card -->
          <div class="reveal delay-150">
            <div
              @click="toggleCard('certifications')"
              @mouseenter="handleMouseEnter('certifications')"
              @mouseleave="handleMouseLeave('certifications')"
              :class="[
                'p-5 bg-white dark:bg-slate-900 border rounded-3xl shadow-sm transition-all duration-500 flex flex-col w-full cursor-pointer',
                activeCard === 'certifications'
                  ? 'border-violet-400 dark:border-violet-850 shadow-md ring-1 ring-violet-500/10'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-750'
              ]"
            >
              <!-- Header Row -->
              <div class="flex items-center justify-between shrink-0 select-none">
                <h3 class="text-sm font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-2.5 uppercase tracking-wider">
                  <!-- Certificate badge SVG -->
                  <svg class="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  <span>Certifications</span>
                </h3>
                
                <div class="flex items-center gap-2 text-violet-500 dark:text-violet-400">
                  <span class="text-[10px] font-extrabold uppercase tracking-widest">
                    {{ activeCard === 'certifications' ? 'Collapse' : 'Expand' }}
                  </span>
                  <svg
                    :class="['w-4 h-4 text-slate-400 dark:text-slate-500 transform transition-transform duration-500 shrink-0', activeCard === 'certifications' ? 'rotate-180' : '']"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
              
              <!-- Expanded content -->
              <div
                :class="[
                  'transition-all duration-500 ease-in-out origin-top',
                  activeCard === 'certifications' ? 'max-h-[500px] opacity-100 mt-5' : 'max-h-0 opacity-0 overflow-hidden'
                ]"
              >
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    v-for="cert in certifications"
                    :key="cert.name"
                    class="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-sm hover:border-emerald-350 dark:hover:border-emerald-800 transition-all flex gap-3 items-center"
                  >
                    <div class="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40">
                      <svg class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" :d="cert.iconPath"/>
                      </svg>
                    </div>
                    <div class="min-w-0">
                      <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 truncate leading-snug" :title="cert.name">
                        {{ cert.name }}
                      </h4>
                      <p class="text-[10px] font-bold text-emerald-650 dark:text-emerald-500 uppercase tracking-wider">
                        {{ cert.issuer }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Achievements Card -->
          <div class="reveal delay-200">
            <div
              @click="toggleCard('achievements')"
              @mouseenter="handleMouseEnter('achievements')"
              @mouseleave="handleMouseLeave('achievements')"
              :class="[
                'p-5 bg-white dark:bg-slate-900 border rounded-3xl shadow-sm transition-all duration-500 flex flex-col w-full cursor-pointer',
                activeCard === 'achievements'
                  ? 'border-violet-400 dark:border-violet-850 shadow-md ring-1 ring-violet-500/10'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-750'
              ]"
            >
              <!-- Header Row -->
              <div class="flex items-center justify-between shrink-0 select-none">
                <h3 class="text-sm font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-2.5 uppercase tracking-wider">
                  <!-- Trophy SVG icon -->
                  <svg class="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 3h14M9 3v2a3 3 0 003 3v0a3 3 0 003-3V3M5 3a2 2 0 00-2 2v1a4 4 0 004 4h0M19 3a2 2 0 012 2v1a4 4 0 01-4 4h0M12 8v5m-3 6h6a1 1 0 001-1v-1a3 3 0 00-3-3v0a3 3 0 00-3 3v1a1 1 0 001 1z"/>
                  </svg>
                  <span>Key Achievements</span>
                </h3>
                
                <div class="flex items-center gap-2 text-violet-500 dark:text-violet-400">
                  <span class="text-[10px] font-extrabold uppercase tracking-widest">
                    {{ activeCard === 'achievements' ? 'Collapse' : 'Expand' }}
                  </span>
                  <svg
                    :class="['w-4 h-4 text-slate-400 dark:text-slate-500 transform transition-transform duration-500 shrink-0', activeCard === 'achievements' ? 'rotate-180' : '']"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
              
              <!-- Expanded content -->
              <div
                :class="[
                  'transition-all duration-500 ease-in-out origin-top',
                  activeCard === 'achievements' ? 'max-h-[500px] opacity-100 mt-5' : 'max-h-0 opacity-0 overflow-hidden'
                ]"
              >
                <div class="space-y-4">
                  <div
                    v-for="ach in achievements"
                    :key="ach.sub"
                    class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex gap-3 hover:border-violet-300 dark:hover:border-violet-850 transition-colors"
                  >
                    <div class="shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/40 text-amber-600">
                      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                      </svg>
                    </div>
                    <div>
                      <div class="text-[10px] font-bold text-amber-700 dark:text-amber-500 uppercase tracking-wider mb-0.5">
                        {{ ach.title }}
                      </div>
                      <div class="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {{ ach.sub }}
                      </div>
                      <div class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        {{ ach.desc }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Extracurricular Activities Card -->
          <div class="reveal delay-250">
            <div
              @click="toggleCard('extracurriculars')"
              @mouseenter="handleMouseEnter('extracurriculars')"
              @mouseleave="handleMouseLeave('extracurriculars')"
              :class="[
                'p-5 bg-white dark:bg-slate-900 border rounded-3xl shadow-sm transition-all duration-500 flex flex-col w-full cursor-pointer',
                activeCard === 'extracurriculars'
                  ? 'border-violet-400 dark:border-violet-850 shadow-md ring-1 ring-violet-500/10'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-750'
              ]"
            >
              <!-- Header Row -->
              <div class="flex items-center justify-between shrink-0 select-none">
                <h3 class="text-sm font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-2.5 uppercase tracking-wider">
                  <!-- Users/Group SVG icon -->
                  <svg class="w-5 h-5 text-violet-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                  <span>Extracurricular Activities</span>
                </h3>
                
                <div class="flex items-center gap-2 text-violet-500 dark:text-violet-400">
                  <span class="text-[10px] font-extrabold uppercase tracking-widest">
                    {{ activeCard === 'extracurriculars' ? 'Collapse' : 'Expand' }}
                  </span>
                  <svg
                    :class="['w-4 h-4 text-slate-400 dark:text-slate-500 transform transition-transform duration-500 shrink-0', activeCard === 'extracurriculars' ? 'rotate-180' : '']"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
              
              <!-- Expanded content -->
              <div
                :class="[
                  'transition-all duration-500 ease-in-out origin-top',
                  activeCard === 'extracurriculars' ? 'max-h-[500px] opacity-100 mt-5' : 'max-h-0 opacity-0 overflow-hidden'
                ]"
              >
                <div class="grid grid-cols-1 gap-4">
                  <div
                    v-for="act in extracurriculars"
                    :key="act.club"
                    class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col hover:border-violet-300 dark:hover:border-violet-850 hover:shadow transition-all duration-300"
                  >
                    <div class="flex items-center gap-2 mb-1.5">
                      <span class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border bg-violet-50 dark:bg-violet-950/40 text-violet-655 dark:text-violet-400 border-violet-200 dark:border-violet-800/40">
                        {{ act.role }}
                      </span>
                    </div>
                    <h4 class="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {{ act.club }}
                    </h4>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {{ act.desc }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>
