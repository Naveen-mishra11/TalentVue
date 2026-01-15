import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    // ✅ Force Vite to pre-bundle react-resizable-panels correctly
    include: ["react-resizable-panels"]
  }
})
