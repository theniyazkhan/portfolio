<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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
  <!-- Outer glow ring -->
  <div
    class="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300"
    :class="isVisible ? 'opacity-100' : 'opacity-0'"
    :style="{
      transform: `translate(${cursorX - (isHovering ? 24 : 16)}px, ${cursorY - (isHovering ? 24 : 16)}px)`,
      width: isHovering ? '48px' : '32px',
      height: isHovering ? '48px' : '32px',
      transition: 'width 0.3s ease, height 0.3s ease',
    }"
  >
    <div
      class="w-full h-full rounded-full border-2 border-white/80 transition-all duration-300"
      :class="isHovering ? 'scale-100 bg-white/10' : 'scale-100'"
    ></div>
  </div>
  <!-- Inner dot -->
  <div
    class="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300"
    :class="isVisible ? 'opacity-100' : 'opacity-0'"
    :style="{
      transform: `translate(${cursorX - 3}px, ${cursorY - 3}px)`,
    }"
  >
    <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
  </div>
</template>
