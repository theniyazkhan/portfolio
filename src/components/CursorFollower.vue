<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useDarkMode } from '../composables/useDarkMode.js'

const { isDark } = useDarkMode()

const dotX = ref(-100)
const dotY = ref(-100)
const ringX = ref(-100)
const ringY = ref(-100)

const isVisible = ref(false)
const isHovering = ref(false)
const isClicking = ref(false)

let rafId = null
let targetX = -100
let targetY = -100

function onMouseMove(e) {
  targetX = e.clientX
  targetY = e.clientY
  
  if (!isVisible.value) {
    isVisible.value = true
    // Initialize positions instantly on first move to prevent entering from top-left
    dotX.value = targetX
    dotY.value = targetY
    ringX.value = targetX
    ringY.value = targetY
  }
}

function onMouseLeave() {
  isVisible.value = false
}

function onMouseEnter() {
  isVisible.value = true
}

function onMouseDown() {
  isClicking.value = true
}

function onMouseUp() {
  isClicking.value = false
}

function animate() {
  // Smoothly interpolate positions
  // Inner dot is snappy
  dotX.value += (targetX - dotX.value) * 0.3
  dotY.value += (targetY - dotY.value) * 0.3
  
  // Outer ring is fluidly lagging
  ringX.value += (targetX - ringX.value) * 0.09
  ringY.value += (targetY - ringY.value) * 0.09
  
  rafId = requestAnimationFrame(animate)
}

function onPointerOver(e) {
  const target = e.target
  if (
    target.closest('a') ||
    target.closest('button') ||
    target.tagName === 'A' ||
    target.tagName === 'BUTTON' ||
    target.closest('[data-cursor-hover]')
  ) {
    isHovering.value = true
  }
}

function onPointerOut(e) {
  const target = e.target
  if (
    target.closest('a') ||
    target.closest('button') ||
    target.tagName === 'A' ||
    target.tagName === 'BUTTON' ||
    target.closest('[data-cursor-hover]')
  ) {
    isHovering.value = false
  }
}

onMounted(() => {
  // Only show on devices with a pointer (not touch)
  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('pointerover', onPointerOver)
    document.addEventListener('pointerout', onPointerOut)
    rafId = requestAnimationFrame(animate)
  }
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseleave', onMouseLeave)
  document.removeEventListener('mouseenter', onMouseEnter)
  document.removeEventListener('mousedown', onMouseDown)
  document.removeEventListener('mouseup', onMouseUp)
  document.removeEventListener('pointerover', onPointerOver)
  document.removeEventListener('pointerout', onPointerOut)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <div v-if="isVisible" class="pointer-events-none select-none">
    <!-- 1. Outer Ring (fades and shrinks on hover, contracts on click) -->
    <div
      class="fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-300 ease-out"
      :style="{
        transform: `translate(${ringX - 16}px, ${ringY - 16}px)`,
        opacity: isHovering ? 0 : 1,
        width: '32px',
        height: '32px'
      }"
    >
      <div
        class="w-full h-full rounded-full border transition-all duration-300"
        :class="[
          isDark ? 'border-cyan-400/40 bg-cyan-400/5' : 'border-violet-600/40 bg-violet-600/5',
          isClicking ? 'scale-50 opacity-50' : 'scale-100'
        ]"
      ></div>
    </div>

    <!-- 2. Inner Dot / Blending Circle (expands and inverts color on hover, scales on click) -->
    <div
      class="fixed top-0 left-0 pointer-events-none z-[9999]"
      :style="{
        transform: isHovering 
          ? `translate(${dotX - 24}px, ${dotY - 24}px)` 
          : `translate(${dotX - 4}px, ${dotY - 4}px)`,
      }"
    >
      <div
        class="rounded-full transition-all duration-300 ease-out"
        :class="[
          isHovering 
            ? 'w-12 h-12 bg-white mix-blend-difference' 
            : 'w-2 h-2 ' + (isDark ? 'bg-cyan-400' : 'bg-violet-600'),
          isClicking ? (isHovering ? 'scale-90' : 'scale-75') : 'scale-100'
        ]"
      ></div>
    </div>
  </div>
</template>
