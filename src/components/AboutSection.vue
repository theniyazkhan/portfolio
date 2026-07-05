<script setup>
const achievements = [
  {
    title: 'Champion',
    sub: 'MU CSE FEST 2024 — Design Segment',
    desc: 'Competed against 50+ designers, solving five intense design challenges under strict constraints.',
  },
  {
    title: 'Finalist',
    sub: 'Intra MU Programming Contest 2025',
    desc: 'Selected as finalist in the programming competition organized by MU CSE Society.',
  },
  {
    title: 'Scholar',
    sub: 'Two Board Scholarships',
    desc: 'Awarded prestigious Government Scholarships for excellence in PSC and JSC Board exams.',
  },
]

const extracurriculars = [
  {
    role: 'Executive Member',
    club: 'MU Robotics Club',
    desc: 'Contributing to robotic designs and club operations.',
  },
  {
    role: 'Design Secretary',
    club: 'MU Islamic Society',
    desc: 'Organized Seerah Conference 2025 and managed Faith Future & Focus Program.',
  },
  {
    role: 'General Member',
    club: 'CSE Society & MU Geography Society',
    desc: 'Volunteered for CSE FEST 2023 and geographic field events in 2024.',
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

          <div class="pl-5 border-l-4 border-violet-300 dark:border-violet-800 mb-8">
            <p class="text-base sm:text-lg text-slate-600 dark:text-slate-400 italic leading-relaxed">
              "Final-year Computer Science & Engineering student and published researcher bridging the gap between software engineering, data-driven GTM platforms, and creative design."
            </p>
          </div>

          <div class="space-y-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            <p>
              I am completing my B.Sc. in Computer Science and Engineering at
              <strong class="text-slate-900 dark:text-slate-200">Metropolitan University, Sylhet</strong> (2023 - 2026). I am a self-motivated developer and researcher with a proven track record of bringing design ideas to life while ensuring clean code foundations.
            </p>
            <p>
              Currently, I work as a
              <strong class="text-slate-900 dark:text-slate-200">GTM Engineer at IntelliGency Solutions</strong>. This role blends web engineering (such as developing doctor appointment platforms) with conversion tracking pipelines and growth design.
            </p>
            <p>
              Previously, I served as the
              <strong class="text-slate-900 dark:text-slate-200">Senior Visual Designer at Islamic Online Madrasah (IOM)</strong>, refining my visual language, managing design systems, and boosting audience engagement across online spaces.
            </p>
          </div>
        </div>

        <!-- Right: Achievements & Extracurriculars -->
        <div class="w-full lg:w-1/2 space-y-8">
          <!-- Achievements Card Block -->
          <div class="reveal delay-200">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <!-- Trophy SVG icon -->
              <svg class="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 3h14M9 3v2a3 3 0 003 3v0a3 3 0 003-3V3M5 3a2 2 0 00-2 2v1a4 4 0 004 4h0M19 3a2 2 0 012 2v1a4 4 0 01-4 4h0M12 8v5m-3 6h6a1 1 0 001-1v-1a3 3 0 00-3-3v0a3 3 0 00-3 3v1a1 1 0 001 1z"/>
              </svg>
              Key Achievements
            </h3>
            <div class="space-y-4">
              <div
                v-for="ach in achievements"
                :key="ach.sub"
                class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex gap-3 hover:border-violet-300 dark:hover:border-violet-800 transition-colors"
              >
                <div class="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/40 text-amber-600">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                </div>
                <div>
                  <div class="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-0.5">
                    {{ ach.title }}
                  </div>
                  <div class="text-base font-bold text-slate-800 dark:text-slate-200">
                    {{ ach.sub }}
                  </div>
                  <div class="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {{ ach.desc }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Extracurricular Activities Block -->
          <div class="reveal delay-300">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <!-- Users/Group SVG icon -->
              <svg class="w-5 h-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              Extracurricular Activities
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div
                v-for="act in extracurriculars"
                :key="act.club"
                class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col hover:border-violet-300 dark:hover:border-violet-800 transition-colors"
              >
                <div class="flex items-center gap-2 mb-1.5">
                  <span class="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-full border bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800/40">
                    {{ act.role }}
                  </span>
                </div>
                <h4 class="text-base font-bold text-slate-800 dark:text-slate-200">{{ act.club }}</h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{{ act.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
