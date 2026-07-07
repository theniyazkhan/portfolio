<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isSummoned = ref(false)
const catState = ref('idle') // 'idle' | 'walking' | 'sleeping' | 'jumping' | 'eating'
const catX = ref(150)
const catY = ref(window.innerHeight - 120)
const targetX = ref(150)
const targetY = ref(window.innerHeight - 120)
const cursorX = ref(150)
const cursorY = ref(window.innerHeight - 120)
const direction = ref(1) // 1 = right, -1 = left

// Pupil offset tracking
const pupilOffsetX = ref(0)
const pupilOffsetY = ref(0)

// Interactive Feed System
const isFoodSpawned = ref(false)
const foodX = ref(0)
const foodY = ref(0)
const bubbleText = ref('')

let animationFrameId = null
let idleTimeoutId = null
let bubbleTimeoutId = null
const SPEED = 4.0 // Slightly faster, interactive walking speed

// Summon/Dismiss pet
function toggleSummon() {
  isSummoned.value = !isSummoned.value
  if (isSummoned.value) {
    // Start at bottom center
    catX.value = Math.random() * (window.innerWidth - 150) + 75
    catY.value = window.innerHeight - 125
    targetX.value = catX.value
    targetY.value = catY.value
    cursorX.value = catX.value
    cursorY.value = catY.value
    startLoop()
    showBubble('Hello! Meow 🐱', 2500)
  } else {
    stopLoop()
    isFoodSpawned.value = false
    clearBubble()
  }
}

// Track mouse cursor to make the eyes look at it
function handleMouseMove(e) {
  cursorX.value = e.clientX
  cursorY.value = e.clientY
  updateEyeDirections()
}

// Global click handler: Kitten walks to where clicked
function handleWindowClick(e) {
  if (!isSummoned.value) return

  // Ignore clicks on control panels or interactive buttons
  if (e.target.closest('.pet-control-panel') || e.target.closest('.summon-btn')) {
    return
  }

  // Check if click was on the kitten container itself
  const isKittenClick = e.target.closest('.pet-character-container')
  if (isKittenClick) {
    handlePounce()
    return
  }

  // If food is active, don't change target until eaten
  if (isFoodSpawned.value) return

  // Update movement target to click coordinates
  // offset by 32px to center the kitten (w-16 = 64px)
  targetX.value = e.clientX - 32
  targetY.value = e.clientY - 40

  if (catState.value === 'sleeping') {
    catState.value = 'idle'
  }
  resetIdleTimer()
}

// Make eyes calculate direction and look towards the cursor
function updateEyeDirections() {
  if (!isSummoned.value) return

  // Cat head center coordinates approximate: catX + 64px, catY + 38px
  const headGlobalX = catX.value + 32
  const headGlobalY = catY.value + 38

  const dx = cursorX.value - headGlobalX
  const dy = cursorY.value - headGlobalY
  const dist = Math.hypot(dx, dy)

  if (dist > 5) {
    const angle = Math.atan2(dy, dx)
    const maxOffset = 2.5
    // Scale horizontal offset based on direction factor
    pupilOffsetX.value = Math.cos(angle) * Math.min(dist / 40, maxOffset) * direction.value
    pupilOffsetY.value = Math.sin(angle) * Math.min(dist / 40, maxOffset)
  } else {
    pupilOffsetX.value = 0
    pupilOffsetY.value = 0
  }
}

// Play: Click to trigger pounce/jump
function handlePounce() {
  if (catState.value === 'sleeping') {
    catState.value = 'idle'
    showBubble('Yawn... 💤', 1500)
    resetIdleTimer()
    return
  }
  if (catState.value === 'eating') return

  catState.value = 'jumping'
  showBubble('Boing! 🐾', 1000)
  setTimeout(() => {
    if (catState.value === 'jumping') {
      catState.value = 'idle'
      resetIdleTimer()
    }
  }, 800)
}

// Feed: Drops a fish for the cat
function feedKitten() {
  if (!isSummoned.value) toggleSummon()
  if (catState.value === 'eating') return

  // Wake up if sleeping
  if (catState.value === 'sleeping') {
    catState.value = 'idle'
  }

  // Spawn food at a random position near bottom screen zone
  const paddingX = 100
  foodX.value = Math.random() * (window.innerWidth - paddingX * 2) + paddingX
  foodY.value = window.innerHeight - 110 // Align with walk plane
  isFoodSpawned.value = true

  // Direct cat to walk to the food
  targetX.value = foodX.value - 32
  targetY.value = foodY.value - 40

  showBubble('Ooh! Fish! 🐟', 2000)
  resetIdleTimer()
}

// Put cat to sleep
function sleepKitten() {
  if (!isSummoned.value) toggleSummon()
  if (catState.value === 'eating') return
  catState.value = 'sleeping'
  showBubble('Zzz...', 3000)
}

// Bubble utilities
function showBubble(text, duration) {
  clearBubble()
  bubbleText.value = text
  bubbleTimeoutId = setTimeout(() => {
    bubbleText.value = ''
  }, duration)
}

function clearBubble() {
  if (bubbleTimeoutId) clearTimeout(bubbleTimeoutId)
  bubbleText.value = ''
}

function resetIdleTimer() {
  if (idleTimeoutId) clearTimeout(idleTimeoutId)
  if (catState.value === 'jumping' || catState.value === 'eating') return

  idleTimeoutId = setTimeout(() => {
    if (catState.value === 'idle') {
      catState.value = 'sleeping'
      showBubble('Zzz...', 4000)
    }
  }, 12000) // Sleep after 12s of static posture
}

// Custom command bus listener
function handleKittenCommand(e) {
  const cmd = e.detail
  if (cmd === 'toggle-summon') {
    toggleSummon()
  } else if (cmd === 'feed') {
    feedKitten()
  } else if (cmd === 'play') {
    handlePounce()
  } else if (cmd === 'sleep') {
    sleepKitten()
  }
}

// Behavior loop
function updateLoop() {
  if (!isSummoned.value) return

  const dx = targetX.value - catX.value
  const dy = targetY.value - catY.value
  const distance = Math.hypot(dx, dy)

  // Keep target and cat inside bounds
  const minX = 20
  const maxX = window.innerWidth - 80
  const minY = 65
  const maxY = window.innerHeight - 105

  if (catState.value !== 'jumping' && catState.value !== 'sleeping' && catState.value !== 'eating') {
    if (distance > 10) {
      catState.value = 'walking'

      const angle = Math.atan2(dy, dx)
      const nextX = catX.value + Math.cos(angle) * SPEED
      const nextY = catY.value + Math.sin(angle) * SPEED

      catX.value = Math.max(minX, Math.min(maxX, nextX))
      catY.value = Math.max(minY, Math.min(maxY, nextY))

      // Update looking direction based on move vector
      if (dx > 2) direction.value = 1
      if (dx < -2) direction.value = -1
    } else {
      // Reached target
      if (isFoodSpawned.value) {
        // Reached food! Trigger eating state
        catState.value = 'eating'
        isFoodSpawned.value = false
        showBubble('Nom nom... 🐟', 2200)

        setTimeout(() => {
          catState.value = 'idle'
          showBubble('Thank you! Meow! ❤️', 2000)
          resetIdleTimer()
        }, 2200)
      } else {
        catState.value = 'idle'
      }
    }
  }

  // Update eye position matching current coordinate frame
  updateEyeDirections()

  animationFrameId = requestAnimationFrame(updateLoop)
}

function startLoop() {
  stopLoop()
  animationFrameId = requestAnimationFrame(updateLoop)
  resetIdleTimer()
}

function stopLoop() {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (idleTimeoutId) clearTimeout(idleTimeoutId)
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('click', handleWindowClick)
  window.addEventListener('kitten-command', handleKittenCommand)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('click', handleWindowClick)
  window.removeEventListener('kitten-command', handleKittenCommand)
  stopLoop()
})
</script>

<template>
  <div>
    <!-- Floating Virtual Food / Fish on Screen -->
    <div
      v-if="isFoodSpawned"
      class="fixed z-40 pointer-events-none select-none transition-all duration-300"
      :style="{ left: `${foodX}px`, top: `${foodY}px` }"
    >
      <div class="animate-bounce">
        <!-- SVG Pixel/Cute Fish -->
        <svg viewBox="0 0 24 24" class="w-8 h-8 text-cyan-400 dark:text-cyan-300 drop-shadow-md">
          <path
            fill="currentColor"
            d="M2,12C5,17 11,18 15,15C16.5,13.5 18,13 20,14C19,12 19,10 20,8C18,9 16.5,8.5 15,7C11,4 5,5 2,12 Z"
          />
          <path
            fill="currentColor"
            class="text-cyan-600 dark:text-cyan-500"
            d="M17,10.5 C16.5,10.5 16,10 16,9.5 C16,9 16.5,8.5 17,8.5 C17.5,8.5 18,9 18,9.5 C18,10 17.5,10.5 17,10.5 Z"
          />
        </svg>
      </div>
    </div>

    <!-- Summon Floating Button and Interactive Control Dock in Bottom Corner -->
    <div class="fixed bottom-24 right-8 z-40 flex items-center gap-3">
      <!-- Pet control buttons dock (visible when summoned) -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-x-10 scale-90"
        enter-to-class="opacity-100 translate-x-0 scale-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-x-0 scale-100"
        leave-to-class="opacity-0 translate-x-10 scale-90"
      >
        <div
          v-if="isSummoned"
          class="pet-control-panel flex items-center gap-2 p-1.5 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-full shadow-lg backdrop-blur-md"
        >
          <!-- Feed Button -->
          <button
            @click="feedKitten"
            class="p-2 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 border border-cyan-100 dark:border-cyan-900/40 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            title="Feed pet a fish"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" class="hidden"/>
              <!-- Custom fish bone SVG icon path -->
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 12c4-2 7-2 11 0m-8 2v-4m3 5V9m3 4v-2M21 12l-5-4v8l5-4z"/>
            </svg>
          </button>

          <!-- Play Button -->
          <button
            @click="handlePounce"
            class="p-2 bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-900/50 border border-violet-200/50 dark:border-violet-800/40 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            title="Play with pet"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <!-- Ball of yarn custom SVG icon path -->
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6a6 6 0 016 6m-12 0a6 6 0 016-6m-6 6a6 6 0 006 6m0-12a6 6 0 006 6"/>
            </svg>
          </button>

          <!-- Sleep Button -->
          <button
            @click="sleepKitten"
            class="p-2 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/50 border border-amber-200/50 dark:border-amber-800/40 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            title="Put pet to sleep"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
          </button>
        </div>
      </Transition>

      <!-- Summon Main Button -->
      <button
        @click="toggleSummon"
        class="summon-btn p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all text-slate-650 dark:text-slate-300 flex items-center justify-center gap-2 text-xs font-extrabold select-none cursor-pointer"
        title="Summon or dismiss pet kitten"
      >
        <!-- Custom vector cute cat head path -->
        <svg class="w-5 h-5 text-violet-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.25V5.5L7 7.5l5-2.25L17 7.5l4-2v2.75A7.25 7.25 0 0113.75 15.5h-3.5A7.25 7.25 0 013 8.25zM7.5 10.5a.75.75 0 100-1.5.75.75 0 000 1.5zm9 0a.75.75 0 100-1.5.75.75 0 000 1.5zm-5.5 3a1.5 1.5 0 002 0"/>
        </svg>
        <span>{{ isSummoned ? 'Dismiss Pet' : 'Summon Pet' }}</span>
      </button>
    </div>

    <!-- Kitten Companion Character -->
    <div
      v-if="isSummoned"
      class="fixed z-50 pointer-events-none select-none pet-character-container"
      :style="{
        left: `${catX}px`,
        top: `${catY}px`,
        transform: `scaleX(${direction})`,
        transition: 'transform 0.15s ease-out'
      }"
    >
      <div
        class="relative w-16 h-16 pointer-events-auto cursor-pointer"
      >
        <!-- Speech / Sleep Bubble container -->
        <div
          v-if="bubbleText"
          class="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900/90 dark:bg-white/95 text-white dark:text-slate-950 text-[10px] font-bold rounded-2xl whitespace-nowrap shadow-md border border-slate-800 dark:border-slate-200 select-none pointer-events-none animate-bubble-bounce"
        >
          {{ bubbleText }}
          <!-- Bubble tail -->
          <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[5px] border-x-transparent border-t-[6px] border-t-slate-900/90 dark:border-t-white/95"></div>
        </div>

        <!-- SVG Cute Kitten Vector Illustration -->
        <svg
          viewBox="0 0 100 100"
          class="w-full h-full drop-shadow-md"
          :class="{
            'animate-cat-bounce': catState === 'walking',
            'animate-cat-pounce': catState === 'jumping',
            'animate-cat-sleep': catState === 'sleeping',
            'animate-cat-chew': catState === 'eating'
          }"
        >
          <!-- Back tail (wiggly) -->
          <path
            d="M 25,60 C 15,60 10,40 12,25 C 13,20 18,20 17,25 C 15,35 18,50 30,55"
            fill="none"
            stroke="currentColor"
            stroke-width="5"
            stroke-linecap="round"
            class="text-slate-400 dark:text-slate-600 origin-[30px_55px] animate-tail-wiggle"
          />

          <!-- Rear Left Leg -->
          <ellipse
            cx="35" cy="70" rx="4" ry="10"
            fill="currentColor"
            class="text-slate-500 dark:text-slate-700 origin-[35px_60px]"
            :class="{ 'animate-leg-swing-1': catState === 'walking' }"
          />

          <!-- Rear Right Leg -->
          <ellipse
            cx="48" cy="70" rx="4" ry="10"
            fill="currentColor"
            class="text-slate-400 dark:text-slate-600 origin-[48px_60px]"
            :class="{ 'animate-leg-swing-2': catState === 'walking' }"
          />

          <!-- Body -->
          <rect
            x="30" y="45" width="30" height="20" rx="10"
            fill="currentColor"
            class="text-slate-400 dark:text-slate-600"
          />

          <!-- Front Left Leg -->
          <ellipse
            cx="54" cy="70" rx="4" ry="10"
            fill="currentColor"
            class="text-slate-500 dark:text-slate-700 origin-[54px_60px]"
            :class="{ 'animate-leg-swing-2': catState === 'walking' }"
          />

          <!-- Front Right Leg -->
          <ellipse
            cx="62" cy="70" rx="4" ry="10"
            fill="currentColor"
            class="text-slate-400 dark:text-slate-600 origin-[62px_60px]"
            :class="{ 'animate-leg-swing-1': catState === 'walking' }"
          />

          <!-- Head group -->
          <g class="origin-[64px_42px]">
            <!-- Ears -->
            <polygon points="50,30 58,15 62,32" fill="currentColor" class="text-slate-500 dark:text-slate-700" :class="{ 'animate-ear-twitch-left': catState === 'eating' }"/>
            <polygon points="70,30 68,12 76,28" fill="currentColor" class="text-slate-500 dark:text-slate-700" :class="{ 'animate-ear-twitch-right': catState === 'eating' }"/>
            
            <!-- Head circle -->
            <circle cx="64" cy="38" r="14" fill="currentColor" class="text-slate-400 dark:text-slate-600"/>

            <!-- Face Details (Eyes & Whiskers) -->
            <g v-if="catState !== 'sleeping' && catState !== 'eating'">
              <!-- Sclera (White eye background) -->
              <circle cx="59" cy="36" r="3.5" fill="white"/>
              <circle cx="69" cy="36" r="3.5" fill="white"/>
              
              <!-- Pupil (Tracks cursor dynamically) -->
              <circle :cx="59 + pupilOffsetX" :cy="36 + pupilOffsetY" r="2.2" fill="currentColor" class="text-slate-900"/>
              <circle :cx="69 + pupilOffsetX" :cy="36 + pupilOffsetY" r="2.2" fill="currentColor" class="text-slate-900"/>
              
              <!-- Nose -->
              <polygon points="63.5,39 65.5,39 64.5,41" fill="currentColor" class="text-rose-400"/>
              <!-- Mouth w/ smile -->
              <path d="M 62.5,43 Q 63.5,44.5 64.5,43 Q 65.5,44.5 66.5,43" fill="none" stroke="currentColor" stroke-width="1" class="text-slate-800 dark:text-slate-200"/>
            </g>
            
            <!-- Eating / chewing face expression -->
            <g v-else-if="catState === 'eating'">
              <!-- Happy closed curved eyes -->
              <path d="M 56,37 Q 58.5,34 61,37" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" class="text-slate-800 dark:text-slate-200"/>
              <path d="M 67,37 Q 69.5,34 72,37" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" class="text-slate-800 dark:text-slate-200"/>
              
              <!-- Nose -->
              <polygon points="63.5,39 65.5,39 64.5,41" fill="currentColor" class="text-rose-400"/>
              <!-- Chewing mouth (dynamic ellipse) -->
              <ellipse cx="64.5" cy="44.5" rx="3.5" ry="2.2" fill="currentColor" class="text-slate-800 dark:text-slate-200 animate-mouth-chew" />
            </g>
            
            <!-- Sleeping face -->
            <g v-else class="text-slate-500 dark:text-slate-400">
              <!-- Closed curved slits -->
              <path d="M 57,36 Q 59,38.5 61,36" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M 67,36 Q 69,38.5 71,36" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <!-- Nose -->
              <polygon points="63.5,39 65.5,39 64.5,41" fill="currentColor" class="text-rose-300"/>
            </g>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<style>
/* Tail wiggle animation */
@keyframes tail-wiggle {
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(10deg); }
}
.animate-tail-wiggle {
  animation: tail-wiggle 1.2s ease-in-out infinite;
}

/* Leg swing animations for walking */
@keyframes leg-swing-left {
  0%, 100% { transform: rotate(-15deg); }
  50% { transform: rotate(15deg); }
}
@keyframes leg-swing-right {
  0%, 100% { transform: rotate(15deg); }
  50% { transform: rotate(-15deg); }
}
.animate-leg-swing-1 {
  animation: leg-swing-left 0.4s linear infinite;
}
.animate-leg-swing-2 {
  animation: leg-swing-right 0.4s linear infinite;
}

/* Walking body bounce animation */
@keyframes cat-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
.animate-cat-bounce {
  animation: cat-bounce 0.4s ease-out infinite;
}

/* Sleeping slow breathing animation */
@keyframes cat-sleep {
  0%, 100% { transform: scale(1); opacity: 0.95; }
  50% { transform: scale(0.97); opacity: 0.85; }
}
.animate-cat-sleep {
  animation: cat-sleep 3s ease-in-out infinite;
}

/* Pounce / Jump animation */
@keyframes cat-pounce {
  0% { transform: scaleY(0.9) translateY(0); }
  30% { transform: scaleY(1.15) translateY(-30px) rotate(-12deg); }
  60% { transform: scaleY(1) translateY(-40px) rotate(12deg); }
  90% { transform: scaleY(1.05) translateY(-5px); }
  100% { transform: scaleY(1) translateY(0); }
}
.animate-cat-pounce {
  animation: cat-pounce 0.7s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

/* Chewing mouth motion */
@keyframes mouth-chew {
  0%, 100% { transform: scaleY(0.5); }
  50% { transform: scaleY(1.2); }
}
.animate-mouth-chew {
  animation: mouth-chew 0.25s linear infinite;
  transform-origin: center;
}

/* Chewing ear twitching */
@keyframes ear-twitch-left {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-6deg); }
}
@keyframes ear-twitch-right {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(6deg); }
}
.animate-ear-twitch-left {
  animation: ear-twitch-left 0.3s ease-in-out infinite;
  transform-origin: bottom right;
}
.animate-ear-twitch-right {
  animation: ear-twitch-right 0.3s ease-in-out infinite;
  transform-origin: bottom left;
}

/* Bubble entry animation */
@keyframes bubble-bounce {
  0% { transform: translate(-50%, 10px) scale(0.7); opacity: 0; }
  60% { transform: translate(-50%, -4px) scale(1.05); opacity: 1; }
  100% { transform: translate(-50%, 0) scale(1); opacity: 1; }
}
.animate-bubble-bounce {
  animation: bubble-bounce 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
</style>
