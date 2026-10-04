import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'generate-static-route-fallback',
      closeBundle() {
        const distDirectory = resolve(process.cwd(), 'dist')
        copyFileSync(resolve(distDirectory, 'index.html'), resolve(distDirectory, '404.html'))
      },
    },
  ],
})
