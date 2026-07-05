<template>
  <section
    id="contact"
    class="relative w-full py-20 sm:py-28 overflow-hidden"
  >
    <!-- Soft gradient background -->
    <div
      class="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style="background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.07) 0%, rgba(59,130,246,0.05) 50%, transparent 100%)"
    ></div>

    <div class="relative max-w-4xl mx-auto px-4 sm:px-6">
      <div class="reveal text-center mb-12">
        <!-- Section label -->
        <span
          class="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 rounded-full border border-violet-200 dark:border-violet-800/40 uppercase"
        >
          <!-- Mail SVG -->
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          Get In Touch
        </span>

        <!-- Heading -->
        <h2
          class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-5 leading-tight"
        >
          Let's Build Something
          <span class="gradient-text"> Amazing</span>
        </h2>

        <!-- Subtext -->
        <p
          class="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed"
        >
          I'm currently open to new roles in full-stack development, GTM engineering, and research collaborations. Reach out and let's start a conversation!
        </p>
      </div>

      <!-- Contact Details & Action Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <!-- Phone Card -->
        <a
          href="tel:+8801787617564"
          class="reveal p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-800 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center"
        >
          <div class="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-900/40 flex items-center justify-center mb-4">
            <!-- Phone SVG -->
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
          </div>
          <h3 class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Phone Number</h3>
          <span class="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">+880 1787-617564</span>
        </a>

        <!-- Email Card -->
        <a
          href="mailto:ahmadkhanniyaz@gmail.com"
          class="reveal p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center delay-75"
        >
          <div class="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center mb-4">
            <!-- Mail SVG -->
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
          <h3 class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Email Address</h3>
          <span class="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">ahmadkhanniyaz@gmail.com</span>
        </a>

        <!-- Location Card -->
        <div
          class="reveal p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm transition-all flex flex-col items-center text-center delay-150"
        >
          <div class="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-center mb-4">
            <!-- Pin SVG -->
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <h3 class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Current Location</h3>
          <span class="text-sm font-semibold text-slate-800 dark:text-slate-200">Sylhet, Bangladesh</span>
        </div>
      </div>

      <!-- Action Buttons & Social Icons -->
      <div class="reveal text-center">
        <div class="flex flex-wrap justify-center gap-4 mb-10">
          <!-- Primary CTA Button -->
          <a
            href="mailto:ahmadkhanniyaz@gmail.com"
            class="group px-8 py-4 bg-gradient-to-r from-violet-600 to-blue-500 text-white rounded-xl font-semibold hover:from-violet-700 hover:to-blue-600 hover:-translate-y-1 active:scale-95 transition-all shadow-xl shadow-violet-200/50 dark:shadow-violet-900/40 hover:shadow-2xl hover:shadow-violet-300/60 dark:hover:shadow-violet-900/60 flex items-center justify-center gap-2"
          >
            Say Hello
            <svg class="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </a>

          <!-- LinkedIn CTA Button -->
          <a
            href="https://www.linkedin.com/in/theniyazkhan/"
            target="_blank"
            rel="noopener noreferrer"
            class="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl font-semibold hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:-translate-y-1 active:scale-95 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2.5"
          >
            <svg class="w-5 h-5 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path
                fill-rule="evenodd"
                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                clip-rule="evenodd"
              />
            </svg>
            LinkedIn Profile
          </a>
        </div>

        <!-- Social icons row -->
        <div class="flex justify-center gap-5">
          <a
            href="https://github.com/theniyazkhan"
            target="_blank"
            rel="noopener noreferrer"
            class="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-400 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-sm border border-slate-200/50 dark:border-slate-800/50"
            aria-label="GitHub"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fill-rule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
          <a
            href="https://www.behance.net/theniyazkhan"
            target="_blank"
            rel="noopener noreferrer"
            class="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-400 hover:bg-blue-500 hover:text-white hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-sm border border-slate-200/50 dark:border-slate-800/50"
            aria-label="Behance"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fill-rule="evenodd"
                d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.8h-6.896c.162 1.905 1.503 2.923 3.328 2.923 1.343 0 2.47-.69 2.94-1.614h4.452zm-3.018-4.22c-.173-1.077-1.129-1.921-2.486-1.921-1.352 0-2.378.808-2.583 1.921h5.069zm-10.741 4.22h-9.967v-14h9.118c2.812 0 5.097 1.348 5.097 4.22 0 1.636-.957 2.898-2.316 3.486 1.783.565 2.84 1.933 2.84 3.901 0 3.024-2.531 4.393-4.772 4.393zm-5.553-9.529h4.301c1.393 0 2.215-.71 2.215-1.897 0-1.15-.815-1.776-2.128-1.776h-4.388v3.673zm0 5.759h4.743c1.55 0 2.502-.8 2.502-2.155 0-1.393-.952-2.115-2.508-2.115h-4.737v4.27z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
        <!-- Copyright -->
        <div
          class="border-t border-slate-200 dark:border-slate-800 w-full mt-12 pt-6 text-center text-xs sm:text-sm text-slate-500"
        >
          © 2026 Niyaz Ahmad Khan. Crafted with
          <svg class="w-4 h-4 inline-block text-rose-500 mx-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          using <span class="gradient-text font-semibold">Vue.js & Tailwind CSS</span>.
        </div>
      </div>
    </div>
  </section>
</template>
