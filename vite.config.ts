import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    allowedHosts: ['stilt-watch-antidote.ngrok-free.dev', 'grcmanage.snssquare.com.tunnelto.me','apishub.snssquare.com'],
    proxy: {
      // '/api': 'https://v5wkf1nf-5001.inc1.devtunnels.ms/'
      '/api': 'https://apishub.snssquare.com/'
    }
  }
})
