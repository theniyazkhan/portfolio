<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isSummoned = ref(false)
const catState = ref('idle') // 'idle' | 'walking' | 'sleeping' | 'jumping'
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

let animationFrameId = null
let idleTimeoutId = null
const SPEED = 3.5 // Slightly faster, cute walking speed

// Summon/Dismiss pet
function toggleSummon() {
  isSummoned.value = !isSummoned.value
  if (isSummoned.value) {
    // Start at bottom center
    catX.value = Math.random() * (window.innerWidth - 100) + 50
    catY.value = window.innerHeight - 125
    targetX.value = catX.value
    targetY.value = catY.value
    cursorX.value = catX.value
    cursorY.value = catY.value
    startLoop()
  } else {
    stopLoop()
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

  // Check if click was on the kitten container itself
  const isKittenClick = e.target.closest('.pet-character-container')
  if (isKittenClick) {
    handlePounce()
    return
  }

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
  // Invert scaling if direction === -1
  const headGlobalX = catX.value + 64
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

// Click to trigger pounce/jump
function handlePounce() {
  if (catState.value === 'sleeping') {
    catState.value = 'idle'
    resetIdleTimer()
    return
  }
  catState.value = 'jumping'
  setTimeout(() => {
    catState.value = 'idle'
    resetIdleTimer()
  }, 800)
}

function resetIdleTimer() {
  if (idleTimeoutId) clearTimeout(idleTimeoutId)
  if (catState.value === 'jumping') return

  idleTimeoutId = setTimeout(() => {
    if (catState.value === 'idle') {
      catState.value = 'sleeping'
    }
  }, 10000) // Sleep after 10s of static posture
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

  if (catState.value !== 'jumping' && catState.value !== 'sleeping') {
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
      catState.value = 'idle'
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
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('click', handleWindowClick)
  stopLoop()
})
</script>

<template>
  <div>
    <!-- Summon Floating Button in Bottom Corner -->
    <button
      @click="toggleSummon"
      class="fixed bottom-24 right-8 z-40 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2 text-xs font-extrabold select-none cursor-pointer"
      title="Summon or dismiss pet kitten"
    >
      <!-- Stylized Cat/Kitten SVG Icon -->
      <svg class="w-5 h-5 text-violet-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 2C6.48 2 2 6.48 2 12a10 10 0 0010 10c1.82 0 3.53-.5 5-1.35l3.7.85-.85-3.7A10 10 0 0022 12c0-5.52-4.48-10-10-10zm-3 8.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" class="hidden"/>
        <!-- Custom vector cute cat head path -->
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.25V5.5L7 7.5l5-2.25L17 7.5l4-2v2.75A7.25 7.25 0 0113.75 15.5h-3.5A7.25 7.25 0 013 8.25zM7.5 10.5a.75.75 0 100-1.5.75.75 0 000 1.5zm9 0a.75.75 0 100-1.5.75.75 0 000 1.5zm-5.5 3a1.5 1.5 0 002 0"/>
      </svg>
      <span>{{ isSummoned ? 'Dismiss Pet' : 'Summon Pet' }}</span>
    </button>

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
        <!-- Zzz floating sleep bubble indicator -->
        <span
          v-if="catState === 'sleeping'"
          class="absolute -top-4 left-4 text-xs font-bold text-violet-500/80 animate-zzz pointer-events-none select-none"
        >
          Zzz
        </span>

        <!-- SVG Cute Kitten Vector Illustration -->
        <svg
          viewBox="0 0 100 100"
          class="w-full h-full drop-shadow-md"
          :class="{
            'animate-cat-bounce': catState === 'walking',
            'animate-cat-pounce': catState === 'jumping',
            'animate-cat-sleep': catState === 'sleeping'
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
            <polygon points="50,30 58,15 62,32" fill="currentColor" class="text-slate-500 dark:text-slate-700"/>
            <polygon points="70,30 68,12 76,28" fill="currentColor" class="text-slate-500 dark:text-slate-700"/>
            
            <!-- Head circle -->
            <circle cx="64" cy="38" r="14" fill="currentColor" class="text-slate-400 dark:text-slate-600"/>

            <!-- Face Details (Eyes & Whiskers) -->
            <g v-if="catState !== 'sleeping'">
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

/* Sleeping floating text Zzz */
@keyframes zzz {
  0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
  50% { opacity: 0.8; }
  100% { transform: translate(15px, -30px) scale(1.1); opacity: 0; }
}
.animate-zzz {
  animation: zzz 2s ease-out infinite;
}
</style>
