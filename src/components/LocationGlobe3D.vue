<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { TresCanvas } from '@tresjs/core'

const isDesktop = ref(false)
const globeRotationY = ref(0)
const markerScale = ref(1)

// Spherical coordinates for Bangladesh (Sylhet) on a sphere of radius 1.2
// Latitude: 24.8918 N, Longitude: 91.8679 E
const latRad = (24.8918 * Math.PI) / 180
const lonRad = (91.8679 * Math.PI) / 180
const radius = 1.2

const markerX = radius * Math.cos(latRad) * Math.sin(lonRad)
const markerY = radius * Math.sin(latRad)
const markerZ = radius * Math.cos(latRad) * Math.cos(lonRad)

let rafId = null
let lastTime = 0

function animate(time) {
  if (!lastTime) lastTime = time
  const delta = (time - lastTime) / 1000
  lastTime = time
  
  globeRotationY.value += 0.25 * delta
  markerScale.value = 1 + Math.sin(time * 0.0045) * 0.25
  
  rafId = requestAnimationFrame(animate)
}

onMounted(() => {
  isDesktop.value = window.matchMedia('(pointer: fine)').matches
  if (isDesktop.value) {
    rafId = requestAnimationFrame(animate)
  }
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <div v-if="isDesktop" class="w-full h-full relative">
    <TresCanvas
      :alpha="true"
      :clear-alpha="0"
      :antialias="true"
      :power-preference="'high-performance'"
      style="width: 100%; height: 100%;"
    >
      <!-- Camera tilted slightly downwards to view Bangladesh clearly -->
      <TresPerspectiveCamera :position="[0, 1.2, 3.2]" :look-at="[0, 0.1, 0]" />
      
      <!-- Lighting -->
      <TresAmbientLight :intensity="0.8" />
      <TresDirectionalLight :position="[2, 3, 3]" :intensity="1.5" color="#818cf8" />
      <TresDirectionalLight :position="[-2, -1, 2]" :intensity="0.5" color="#60a5fa" />
      
      <!-- Globe Group -->
      <TresGroup :rotation-y="globeRotationY">
        <!-- Solid inner sphere (dark purple core for depth) -->
        <TresMesh>
          <TresSphereGeometry :args="[1.15, 32, 32]" />
          <TresMeshStandardMaterial
            color="#312e81"
            :transparent="true"
            :opacity="0.25"
            :roughness="0.8"
          />
        </TresMesh>

        <!-- Longitudinal/Latitudinal wireframe globe circles (subtle Indigo) -->
        <TresMesh>
          <TresSphereGeometry :args="[1.2, 18, 18]" />
          <TresMeshBasicMaterial
            color="#6366f1"
            :wireframe="true"
            :transparent="true"
            :opacity="0.18"
          />
        </TresMesh>

        <!-- Equatorial ring (orbit style) -->
        <TresMesh :rotation="[Math.PI / 2, 0.1, 0]">
          <TresRingGeometry :args="[1.3, 1.32, 64]" />
          <TresMeshBasicMaterial
            color="#818cf8"
            :transparent="true"
            :opacity="0.3"
          />
        </TresMesh>

        <!-- Location Marker (Bangladesh) - Glowing Red/Rose -->
        <TresMesh :position="[markerX, markerY, markerZ]" :scale="[markerScale, markerScale, markerScale]">
          <TresSphereGeometry :args="[0.08, 16, 16]" />
          <TresMeshStandardMaterial
            color="#f43f5e"
            :emissive="'#f43f5e'"
            :emissive-intensity="3.0"
          />
        </TresMesh>
      </TresGroup>
    </TresCanvas>
  </div>
</template>
