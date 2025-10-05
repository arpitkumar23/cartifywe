import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // All requests starting with `/api` will go to backend
      '/api': {
        target: 'http://localhost:8000', // backend server
        changeOrigin: true,
      },
    },
  },
})

