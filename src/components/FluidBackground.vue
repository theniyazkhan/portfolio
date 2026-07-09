<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useDarkMode } from '../composables/useDarkMode.js'

const { isDark } = useDarkMode()
const canvasRef = ref(null)

let cleanupFn = null

// Fallback: 2D Canvas Liquid Particle simulation
function initCanvas2DFallback(canvas) {
  const ctx = canvas.getContext('2d')
  let width = (canvas.width = window.innerWidth)
  let height = (canvas.height = window.innerHeight)

  const handleResize = () => {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
  }
  window.addEventListener('resize', handleResize)

  const particles = []
  const maxParticles = 65
  let mouse = { x: width / 2, y: height / 2, active: false }
  let lastMouse = { x: width / 2, y: height / 2 }

  const handleMouseMove = (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
    mouse.active = true

    const dx = mouse.x - lastMouse.x
    const dy = mouse.y - lastMouse.y
    const speed = Math.sqrt(dx * dx + dy * dy)

    if (speed > 1.5) {
      // Create fluid particles
      const count = Math.min(Math.floor(speed / 3) + 1, 4)
      for (let i = 0; i < count; i++) {
        if (particles.length < maxParticles) {
          particles.push({
            x: mouse.x + (Math.random() - 0.5) * 10,
            y: mouse.y + (Math.random() - 0.5) * 10,
            vx: dx * 0.15 + (Math.random() - 0.5) * 2,
            vy: dy * 0.15 + (Math.random() - 0.5) * 2,
            size: Math.random() * 25 + 15,
            hue: (Date.now() / 60 + Math.random() * 20) % 360,
            alpha: 0.45,
            decay: Math.random() * 0.05 + 0.03, // Faster decay (vanish instantly)
          })
        }
      }
    }
    lastMouse.x = mouse.x
    lastMouse.y = mouse.y
  }

  const handleMouseDown = () => {
    // Splash particles on click
    for (let i = 0; i < 15; i++) {
      if (particles.length < maxParticles) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 6 + 2
        particles.push({
          x: mouse.x,
          y: mouse.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 30 + 20,
          hue: (Date.now() / 60 + Math.random() * 40) % 360,
          alpha: 0.65,
          decay: Math.random() * 0.06 + 0.04, // Faster click decay
        })
      }
    }
  }

  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mousedown', handleMouseDown)

  let animationFrameId
  const draw = () => {
    ctx.clearRect(0, 0, width, height)

    // Blend mode to make colors mix fluidly
    ctx.globalCompositeOperation = 'screen'

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      p.x += p.vx
      p.y += p.vy
      p.vx *= 0.96 // Friction
      p.vy *= 0.96
      p.size += 0.35 // Expand as it dissipates
      p.alpha -= p.decay

      if (p.alpha <= 0) {
        particles.splice(i, 1)
        continue
      }

      // Draw particle with soft glow
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
      const color = `hsla(${p.hue}, 85%, 65%, ${p.alpha})`
      const transparent = `hsla(${p.hue}, 85%, 65%, 0)`
      grad.addColorStop(0, color)
      grad.addColorStop(1, transparent)

      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
    }

    animationFrameId = requestAnimationFrame(draw)
  }

  draw()

  return () => {
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mousedown', handleMouseDown)
    cancelAnimationFrame(animationFrameId)
  }
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  
  if (!gl) {
    console.warn('WebGL is not supported. Falling back to 2D Canvas.')
    cleanupFn = initCanvas2DFallback(canvas)
    return
  }

  // Adjust canvas viewport size
  let width = (canvas.width = window.innerWidth)
  let height = (canvas.height = window.innerHeight)

  const handleResize = () => {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
  }
  window.addEventListener('resize', handleResize)

  // Double buffering helper for fluid simulation textures
  const createDoubleFBO = (w, h) => {
    const createFBO = () => {
      const texture = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

      const fbo = gl.createFramebuffer()
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)
      return { texture, fbo }
    }

    let fbo1 = createFBO()
    let fbo2 = createFBO()
    return {
      get read() { return fbo1 },
      get write() { return fbo2 },
      swap() {
        const temp = fbo1
        fbo1 = fbo2
        fbo2 = temp
      }
    }
  }

  // Shader Compilation Utilities
  const compileShader = (type, source) => {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader))
    }
    return shader
  }

  const createProgram = (vertexSource, fragmentSource) => {
    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource)
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource)
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program))
    }
    return program
  }

  // Shader Sources
  const baseVertexShader = `
    attribute vec2 aPosition;
    varying vec2 vUv;
    void main() {
      vUv = aPosition * 0.5 + 0.5;
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `

  const displayShaderSource = `
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    void main() {
      gl_FragColor = texture2D(uTexture, vUv);
    }
  `

  const splatShaderSource = `
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float uAspectRatio;
    uniform vec2 uPoint;
    uniform vec3 uColor;
    uniform float uRadius;
    void main() {
      vec2 p = vUv - uPoint;
      p.x *= uAspectRatio;
      vec3 splat = exp(-dot(p, p) / uRadius) * uColor;
      vec3 base = texture2D(uTarget, vUv).xyz;
      gl_FragColor = vec4(base + splat, 1.0);
    }
  `

  const advectShaderSource = `
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 uTexelSize;
    uniform float uDt;
    uniform float uDissipation;
    void main() {
      vec2 coord = vUv - uDt * texture2D(uVelocity, vUv).xy * uTexelSize;
      gl_FragColor = uDissipation * texture2D(uSource, coord);
    }
  `

  // Compile programs
  const displayProgram = createProgram(baseVertexShader, displayShaderSource)
  const splatProgram = createProgram(baseVertexShader, splatShaderSource)
  const advectProgram = createProgram(baseVertexShader, advectShaderSource)

  // Billboard geometry (Screen Quad)
  const billboardBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, billboardBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
    -1,  1,
     1, -1,
     1,  1
  ]), gl.STATIC_DRAW)

  // Simulation resolution textures (Double Buffered FBOs)
  const simWidth = 256
  const simHeight = 256
  const density = createDoubleFBO(simWidth, simHeight)
  const velocity = createDoubleFBO(simWidth, simHeight)

  // Mouse interaction state
  const pointer = {
    x: 0.5,
    y: 0.5,
    dx: 0,
    dy: 0,
    moved: false,
    color: [0.35, 0.2, 0.95],
  }

  let lastMouseTime = Date.now()
  let mouseLastX = width / 2
  let mouseLastY = height / 2

  const handleMouseMove = (e) => {
    pointer.moved = true
    const x = e.clientX / window.innerWidth
    const y = 1.0 - e.clientY / window.innerHeight
    
    // Scale velocity force
    pointer.dx = (x - pointer.x) * 8.0
    pointer.dy = (y - pointer.y) * 8.0
    pointer.x = x
    pointer.y = y

    // Cycle colors dynamically over time
    const time = Date.now() * 0.0015
    pointer.color = [
      Math.sin(time) * 0.4 + 0.6,
      Math.cos(time * 0.83) * 0.4 + 0.6,
      Math.sin(time * 1.37) * 0.4 + 0.6,
    ]
  }

  const handleMouseDown = () => {
    // Generate a massive splat on mouse click
    pointer.moved = true
    pointer.dx = (Math.random() - 0.5) * 45
    pointer.dy = (Math.random() - 0.5) * 45
    // Bright colors
    const time = Math.random() * 100
    pointer.color = [
      Math.sin(time) * 0.5 + 0.5,
      Math.cos(time * 0.7) * 0.5 + 0.5,
      Math.sin(time * 1.2) * 0.5 + 0.5,
    ]
  }

  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mousedown', handleMouseDown)

  let lastTime = Date.now()
  let animationId = null

  // Render simulation frame
  const updateSim = () => {
    const now = Date.now()
    const dt = Math.min((now - lastTime) / 1000, 0.033)
    lastTime = now

    // 1. Setup Quad Attribute
    gl.bindBuffer(gl.ARRAY_BUFFER, billboardBuffer)
    gl.viewport(0, 0, simWidth, simHeight)

    // 2. Advect Velocity Texture
    gl.useProgram(advectProgram)
    const positionLocAdvect = gl.getAttribLocation(advectProgram, 'aPosition')
    gl.enableVertexAttribArray(positionLocAdvect)
    gl.vertexAttribPointer(positionLocAdvect, 2, gl.FLOAT, false, 0, 0)

    gl.uniform2f(gl.getUniformLocation(advectProgram, 'uTexelSize'), 1.0 / simWidth, 1.0 / simHeight)
    gl.uniform1f(gl.getUniformLocation(advectProgram, 'uDt'), dt)
    gl.uniform1f(gl.getUniformLocation(advectProgram, 'uDissipation'), 0.90) // Slower/faster velocity fade rate
    gl.uniform1i(gl.getUniformLocation(advectProgram, 'uVelocity'), 0)
    gl.uniform1i(gl.getUniformLocation(advectProgram, 'uSource'), 0)

    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture)
    gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.write.fbo)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
    velocity.swap()

    // 3. Advect Density Texture
    gl.uniform1f(gl.getUniformLocation(advectProgram, 'uDissipation'), 0.86) // Color fade rate (much lower = vanishes instantly)
    gl.uniform1i(gl.getUniformLocation(advectProgram, 'uSource'), 1)
    
    gl.activeTexture(gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D, density.read.texture)
    gl.bindFramebuffer(gl.FRAMEBUFFER, density.write.fbo)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
    density.swap()

    // 4. Inject Splats (Force and Color)
    if (pointer.moved) {
      pointer.moved = false

      // Splat Velocity Force
      gl.useProgram(splatProgram)
      const positionLocSplat = gl.getAttribLocation(splatProgram, 'aPosition')
      gl.enableVertexAttribArray(positionLocSplat)
      gl.vertexAttribPointer(positionLocSplat, 2, gl.FLOAT, false, 0, 0)

      gl.uniform1f(gl.getUniformLocation(splatProgram, 'uAspectRatio'), canvas.width / canvas.height)
      gl.uniform2f(gl.getUniformLocation(splatProgram, 'uPoint'), pointer.x, pointer.y)
      gl.uniform3f(gl.getUniformLocation(splatProgram, 'uColor'), pointer.dx, pointer.dy, 0.0)
      gl.uniform1f(gl.getUniformLocation(splatProgram, 'uRadius'), 0.0006) // Size of interaction trail
      gl.uniform1i(gl.getUniformLocation(splatProgram, 'uTarget'), 0)

      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture)
      gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.write.fbo)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      velocity.swap()

      // Splat Color Density
      gl.uniform3f(gl.getUniformLocation(splatProgram, 'uColor'), pointer.color[0], pointer.color[1], pointer.color[2])
      gl.uniform1f(gl.getUniformLocation(splatProgram, 'uRadius'), 0.001) // Size of color trail
      gl.uniform1i(gl.getUniformLocation(splatProgram, 'uTarget'), 1)

      gl.activeTexture(gl.TEXTURE1)
      gl.bindTexture(gl.TEXTURE_2D, density.read.texture)
      gl.bindFramebuffer(gl.FRAMEBUFFER, density.write.fbo)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      density.swap()
    }

    // 5. Render Fluid Simulation to Viewport Canvas
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.useProgram(displayProgram)
    const positionLocDisplay = gl.getAttribLocation(displayProgram, 'aPosition')
    gl.enableVertexAttribArray(positionLocDisplay)
    gl.vertexAttribPointer(positionLocDisplay, 2, gl.FLOAT, false, 0, 0)

    gl.uniform1i(gl.getUniformLocation(displayProgram, 'uTexture'), 0)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, density.read.texture)

    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    gl.drawArrays(gl.TRIANGLES, 0, 6)

    animationId = requestAnimationFrame(updateSim)
  }

  updateSim()

  cleanupFn = () => {
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mousedown', handleMouseDown)
    cancelAnimationFrame(animationId)
  }
})

onUnmounted(() => {
  if (cleanupFn) cleanupFn()
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="fixed inset-0 z-0 h-full w-full pointer-events-none opacity-45 dark:opacity-20 transition-opacity duration-500"
    :style="{ mixBlendMode: isDark ? 'screen' : 'multiply' }"
  />
</template>

<style scoped>
canvas {
  /* Prevent interaction blockers */
  user-select: none;
  -webkit-user-select: none;
}
</style>
