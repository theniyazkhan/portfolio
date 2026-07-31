import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('Tres') && tag !== 'TresCanvas',
        },
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) {
            return 'three-vendor'
          }
          if (id.includes('node_modules/@tresjs')) {
            return 'tres-vendor'
          }
          if (id.includes('node_modules/vue')) {
            return 'vue-vendor'
          }
        },
      },
    },
  },
})
