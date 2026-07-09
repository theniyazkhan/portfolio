<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { findBestAnswer } from '../data/faq.js'

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
  
  let delta = 130 - Math.random() * 40
  
  if (isDeleting.value) {
    delta = 65 // Slower, constant deleting speed
  }
  
  if (!isDeleting.value && currentTitle.value === fullTitle) {
    delta = 4500 // Hold at full text longer (4.5s)
    isDeleting.value = true
  } else if (isDeleting.value && currentTitle.value === '') {
    isDeleting.value = false
    titleIndex.value = (titleIndex.value + 1) % titles.length
    delta = 1000 // Slower pause before next word (1s)
  }
  
  typingTimeout = setTimeout(tick, delta)
}

// FAQ Chatting Bar States
const chatQuery = ref('')
const fullResponse = ref('')
const visibleResponse = ref('')
const isStreaming = ref(false)
const showResponse = ref(false)
let streamInterval = null

// FAQ Knowledge Base containing Niyaz's data
function handleChatSubmit() {
  if (isStreaming.value || !chatQuery.value.trim()) return

  if (streamInterval) clearInterval(streamInterval)

  showResponse.value = true
  isStreaming.value = true
  visibleResponse.value = ''

  const responseText = findBestAnswer(chatQuery.value)
  fullResponse.value = responseText

  let charIdx = 0
  streamInterval = setInterval(() => {
    if (charIdx < responseText.length) {
      visibleResponse.value += responseText.charAt(charIdx)
      charIdx++
    } else {
      clearInterval(streamInterval)
      isStreaming.value = false
    }
  }, 18)
}

function clearChat() {
  if (streamInterval) clearInterval(streamInterval)
  chatQuery.value = ''
  visibleResponse.value = ''
  fullResponse.value = ''
  showResponse.value = false
  isStreaming.value = false
}

// Letter-by-letter dropping and scroll-linked animation
const line1 = 'Hello, from '
const line2 = 'Niyaz'
const line1Chars = computed(() => line1.split(''))
const line2Chars = computed(() => line2.split(''))

const scrollY = ref(0)
const animationDone = ref(false)

const handleScroll = () => {
  scrollY.value = window.scrollY
}

const getScrollBounce = (index) => {
  if (!animationDone.value) return 0
  const wave = Math.sin((scrollY.value * 0.008) - (index * 0.25)) - Math.sin(-index * 0.25)
  return wave * 14
}

onMounted(() => {
  tick()
  window.addEventListener('scroll', handleScroll, { passive: true })
  setTimeout(() => {
    animationDone.value = true
  }, 1800)
})

onUnmounted(() => {
  if (typingTimeout) clearTimeout(typingTimeout)
  if (streamInterval) clearInterval(streamInterval)
  window.removeEventListener('scroll', handleScroll)
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
          class="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
        >
          <span class="inline">
            <span
              v-for="(char, i) in line1Chars"
              :key="'l1-' + i"
              class="letter-drop inline-block text-slate-900 dark:text-white"
              :style="{
                animationDelay: `${300 + i * 55}ms`,
                transform: animationDone ? `translateY(${getScrollBounce(i)}px)` : undefined,
                transition: animationDone ? 'transform 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)' : undefined
              }"
            >{{ char === ' ' ? '\u00A0' : char }}</span>
          </span>
          <br class="hidden md:block" />
          <span class="inline">
            <span
              v-for="(char, j) in line2Chars"
              :key="'l2-' + j"
              class="letter-drop inline-block gradient-text"
              :style="{
                animationDelay: `${300 + (line1Chars.length + j) * 55}ms`,
                transform: animationDone ? `translateY(${getScrollBounce(line1Chars.length + j)}px)` : undefined,
                transition: animationDone ? 'transform 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)' : undefined
              }"
            >{{ char }}</span>
            <span
              class="letter-drop inline-block text-slate-900 dark:text-white"
              :style="{
                animationDelay: `${300 + (line1Chars.length + line2Chars.length) * 55}ms`,
                transform: animationDone ? `translateY(${getScrollBounce(line1Chars.length + line2Chars.length)}px)` : undefined,
                transition: animationDone ? 'transform 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)' : undefined
              }"
            >!</span>
          </span>
        </h1>

        <!-- Description -->
        <p
          class="fade-in-up delay-300 text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-2xl mx-auto md:mx-0"
        >
          CSE student and published researcher bridging software development, conversion engineering, and layout design.
        </p>

        <!-- FAQ Chatting Bar -->
        <div class="fade-in-up delay-400 w-full max-w-xl">
          <form @submit.prevent="handleChatSubmit" class="relative flex items-center bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-1.5 shadow-lg shadow-slate-100/50 dark:shadow-slate-950/50 backdrop-blur-md focus-within:border-violet-500/50 dark:focus-within:border-violet-400/50 transition-all">
            <input
              v-model="chatQuery"
              type="text"
              placeholder="Ask Niyaz (e.g. skills, projects, experience)..."
              class="flex-1 px-4 py-2 text-sm bg-transparent outline-none border-none text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 font-medium disabled:opacity-50"
              :disabled="isStreaming"
            />
            <button
              type="submit"
              class="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-blue-500 text-white rounded-xl text-xs font-bold hover:from-violet-700 hover:to-blue-600 active:scale-95 transition-all flex items-center justify-center shrink-0 shadow shadow-violet-200/50 dark:shadow-violet-900/50 disabled:opacity-50 cursor-pointer"
              :disabled="!chatQuery.trim() || isStreaming"
            >
              <span>Ask AI</span>
              <svg class="w-3.5 h-3.5 ml-1.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </button>
          </form>

          <!-- Chat Response Panel -->
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-4"
          >
            <div
              v-if="showResponse"
              class="mt-6 p-5 bg-white/85 dark:bg-slate-900/85 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-xl backdrop-blur-md text-left transition-all duration-300 relative overflow-hidden"
            >
              <!-- Subtle background theme glow in panel -->
              <div class="absolute -right-16 -top-16 w-32 h-32 bg-violet-500/10 dark:bg-violet-400/5 blur-2xl rounded-full"></div>
              <div class="relative z-10 flex flex-col gap-2.5">
                <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/50 pb-2">
                  <div class="text-[10px] font-black uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400 flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 bg-violet-500 rounded-full" :class="{ 'animate-ping': isStreaming }"></span>
                    Niyaz's AI Assistant
                  </div>
                  <button
                    @click="clearChat"
                    type="button"
                    class="text-[10px] font-bold text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
                <p class="text-sm text-slate-750 dark:text-slate-350 leading-relaxed min-h-[40px] whitespace-pre-line font-semibold">
                  {{ visibleResponse }}<span v-if="isStreaming" class="inline-block w-1.5 h-3.5 bg-violet-500 dark:bg-violet-400 ml-0.5 animate-pulse shrink-0"></span>
                </p>
              </div>
            </div>
          </Transition>
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

@keyframes slideFromTop {
  from {
    opacity: 0;
    transform: translateY(-80px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-from-top {
  opacity: 0;
  animation: slideFromTop 1s cubic-bezier(0.16, 1, 0.3, 1) 220ms forwards;
}

@keyframes letterDrop {
  0% {
    opacity: 0;
    transform: translateY(-45px) scale(0.95);
    filter: blur(4px);
  }
  60% {
    opacity: 1;
    transform: translateY(4px) scale(1.02);
    filter: blur(0px);
  }
  80% {
    transform: translateY(-2px) scale(1);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0px);
  }
}

.letter-drop {
  opacity: 0;
  animation: letterDrop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
</style>
