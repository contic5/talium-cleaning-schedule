import { defineConfig } from 'vite'

export default defineConfig({
  base: '/talium-cleaning-schedule/', // Match GitHub repo name exactly
  build: {
    outDir: 'build' // Optional — only if you want `build` instead of `dist`
  },
})
