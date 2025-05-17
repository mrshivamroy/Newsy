import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Newsy/', // 👈 This is crucial for GitHub Pages
  plugins: [react()],
})

