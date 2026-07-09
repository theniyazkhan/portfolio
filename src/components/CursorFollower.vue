<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useDarkMode } from '../composables/useDarkMode.js'

const { isDark } = useDarkMode()

const cursorX = ref(-100)
const cursorY = ref(-100)
const isVisible = ref(false)
const isHovering = ref(false)

let rafId = null
let targetX = -100
let targetY = -100

function onMouseMove(e) {
  targetX = e.clientX
  targetY = e.clientY
  if (!isVisible.value) isVisible.value = true
}

function onMouseLeave() {
  isVisible.value = false
}

function onMouseEnter() {
  isVisible.value = true
}

function animate() {
  // Smooth lerp for fluid follow
  cursorX.value += (targetX - cursorX.value) * 0.15
  cursorY.value += (targetY - cursorY.value) * 0.15
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
    document.addEventListener('pointerover', onPointerOver)
    document.addEventListener('pointerout', onPointerOut)
    rafId = requestAnimationFrame(animate)
  }
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseleave', onMouseLeave)
  document.removeEventListener('mouseenter', onMouseEnter)
  document.removeEventListener('pointerover', onPointerOver)
  document.removeEventListener('pointerout', onPointerOut)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <div v-if="isVisible" class="pointer-events-none select-none">
    <!-- 1. Ambient Background Spotlight (behind transparent/blurred content) -->
    <div
      class="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
      :style="{
        background: `radial-gradient(600px circle at ${cursorX}px ${cursorY}px, ${
          isDark 
            ? 'rgba(124, 58, 237, 0.12) 0%, rgba(59, 130, 246, 0.04) 45%, rgba(2, 6, 23, 0) 80%' 
            : 'rgba(99, 102, 241, 0.05) 0%, rgba(59, 130, 246, 0.02) 45%, rgba(248, 250, 252, 0) 80%'
        })`,
      }"
    ></div>

    <!-- 2. Ambient Foreground Glow overlay (soft glow directly below the cursor) -->
    <div
      class="fixed pointer-events-none z-[9998]"
      :style="{
        transform: `translate(${cursorX - 150}px, ${cursorY - 150}px)`,
        width: '300px',
        height: '300px',
        background: `radial-gradient(circle, ${
          isDark 
            ? 'rgba(124, 58, 237, 0.08) 0%, rgba(59, 130, 246, 0.02) 50%, transparent 80%' 
            : 'rgba(99, 102, 241, 0.04) 0%, rgba(59, 130, 246, 0.01) 50%, transparent 80%'
        })`,
      }"
    ></div>

    <!-- 3. Outer Ring -->
    <div
      class="fixed top-0 left-0 pointer-events-none z-[9999]"
      :style="{
        transform: `translate(${cursorX - (isHovering ? 20 : 12)}px, ${cursorY - (isHovering ? 20 : 12)}px)`,
        width: isHovering ? '40px' : '24px',
        height: isHovering ? '40px' : '24px',
        transition: 'width 0.3s cubic-bezier(0.25, 1, 0.5, 1), height 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
      }"
    >
      <div
        class="w-full h-full rounded-full border transition-all duration-300"
        :class="[
          isDark
            ? (isHovering ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'border-cyan-500/40 shadow-[0_0_8px_rgba(34,211,238,0.15)]')
            : (isHovering ? 'border-violet-600 bg-violet-600/10 shadow-[0_0_15px_rgba(124,58,237,0.35)]' : 'border-violet-500/40 shadow-[0_0_8px_rgba(124,58,237,0.15)]')
        ]"
      ></div>
    </div>

    <!-- 4. Inner Dot -->
    <div
      class="fixed top-0 left-0 pointer-events-none z-[9999]"
      :style="{
        transform: `translate(${cursorX - 3}px, ${cursorY - 3}px)`,
      }"
    >
      <div
        class="w-1.5 h-1.5 rounded-full transition-transform duration-300"
        :class="[
          isDark ? 'bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.6)]' : 'bg-violet-600 shadow-[0_0_6px_rgba(124,58,237,0.5)]',
          isHovering ? 'scale-75' : 'scale-100'
        ]"
      ></div>
    </div>
  </div>
</template>
