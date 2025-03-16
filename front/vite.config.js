import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/logs': {
        target: 'http://localhost:4865',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
