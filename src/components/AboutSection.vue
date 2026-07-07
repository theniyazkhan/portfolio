<script setup>
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
      <div class="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        <!-- Left: Who I Am & Bio -->
        <div class="w-full lg:w-1/2 reveal">
          <span
            class="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 rounded-full border border-violet-200 dark:border-violet-800/40 uppercase"
          >
            <!-- User SVG icon -->
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Who I Am
          </span>

          <h2
            class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-5"
          >
            About Me
          </h2>
          <div
            class="h-1.5 w-20 bg-gradient-to-r from-violet-600 to-blue-500 rounded-full mb-7"
          ></div>

          <div class="pl-5 border-l-4 border-violet-350 dark:border-violet-800">
            <p class="text-base sm:text-lg text-slate-650 dark:text-slate-400 italic leading-relaxed font-semibold">
              "CSE student and published researcher bridging software development, conversion engineering, and layout design."
            </p>
          </div>
        </div>

        <!-- Right: Achievements & Extracurriculars Collapsible Drawer Bars -->
        <div class="w-full lg:w-1/2 space-y-6">
          
          <!-- Achievements Drawer Card -->
          <div class="reveal delay-200">
            <div class="group p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden max-h-[60px] hover:max-h-[500px] transition-all duration-500 ease-in-out cursor-pointer hover:border-violet-300 dark:hover:border-violet-850 hover:shadow-lg flex flex-col w-full">
              
              <!-- Header Row (Always Visible) -->
              <div class="flex items-center justify-between shrink-0 h-7 select-none">
                <h3 class="text-sm font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-2.5 uppercase tracking-wider">
                  <!-- Trophy SVG icon -->
                  <svg class="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 3h14M9 3v2a3 3 0 003 3v0a3 3 0 003-3V3M5 3a2 2 0 00-2 2v1a4 4 0 004 4h0M19 3a2 2 0 012 2v1a4 4 0 01-4 4h0M12 8v5m-3 6h6a1 1 0 001-1v-1a3 3 0 00-3-3v0a3 3 0 00-3 3v1a1 1 0 001 1z"/>
                  </svg>
                  <span>Key Achievements</span>
                </h3>
                
                <div class="flex items-center gap-2 text-violet-500 dark:text-violet-400">
                  <span class="text-[10px] font-extrabold uppercase tracking-widest transition-opacity duration-300 group-hover:opacity-0 group-hover:pointer-events-none">
                    Reveal
                  </span>
                  <svg class="w-4 h-4 text-slate-400 dark:text-slate-500 transform transition-transform duration-500 group-hover:rotate-180 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
              
              <!-- Expanded List (Slides out on hover) -->
              <div class="mt-5 space-y-4 opacity-0 scale-95 origin-top transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 flex-1">
                <div
                  v-for="ach in achievements"
                  :key="ach.sub"
                  class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm flex gap-3 hover:border-violet-300 dark:hover:border-violet-800 transition-colors"
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

          <!-- Extracurricular Activities Drawer Card -->
          <div class="reveal delay-300">
            <div class="group p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden max-h-[60px] hover:max-h-[500px] transition-all duration-500 ease-in-out cursor-pointer hover:border-violet-300 dark:hover:border-violet-850 hover:shadow-lg flex flex-col w-full">
              
              <!-- Header Row (Always Visible) -->
              <div class="flex items-center justify-between shrink-0 h-7 select-none">
                <h3 class="text-sm font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-2.5 uppercase tracking-wider">
                  <!-- Users/Group SVG icon -->
                  <svg class="w-5 h-5 text-violet-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                  <span>Extracurricular Activities</span>
                </h3>
                
                <div class="flex items-center gap-2 text-violet-500 dark:text-violet-400">
                  <span class="text-[10px] font-extrabold uppercase tracking-widest transition-opacity duration-300 group-hover:opacity-0 group-hover:pointer-events-none">
                    Reveal
                  </span>
                  <svg class="w-4 h-4 text-slate-400 dark:text-slate-500 transform transition-transform duration-500 group-hover:rotate-180 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
              
              <!-- Expanded List (Slides out on hover) -->
              <div class="mt-5 space-y-4 opacity-0 scale-95 origin-top transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 flex-1">
                <div class="grid grid-cols-1 gap-4">
                  <div
                    v-for="act in extracurriculars"
                    :key="act.club"
                    class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col hover:border-violet-300 dark:hover:border-violet-850 hover:shadow transition-all duration-300"
                  >
                    <div class="flex items-center gap-2 mb-1.5">
                      <span class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border bg-violet-50 dark:bg-violet-950/40 text-violet-655 dark:text-violet-400 border-violet-200 dark:border-violet-800/40">
                        {{ act.role }}
                      </span>
                    </div>
                    <h4 class="text-sm font-bold text-slate-800 dark:text-slate-200">{{ act.club }}</h4>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{{ act.desc }}</p>
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
