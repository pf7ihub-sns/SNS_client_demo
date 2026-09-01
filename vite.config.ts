import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    allowedHosts: ['stilt-watch-antidote.ngrok-free.dev', 'grcmanage.snssquare.com.tunnelto.me'],
    proxy: {
      '/api': 'http://localhost:5001'
    }
  }
})
