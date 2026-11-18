// TEMPORARY: used only to share the local app through an ngrok tunnel for a review.
// Runs on its own port (5175) so the normal dev server on 5174 is left alone.
// /api is proxied to the LOCAL backend so the shared link is a single same-origin site. Deleted after use.
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    strictPort: true,
    allowedHosts: ['.ngrok-free.app', '.ngrok-free.dev', '.ngrok.app', '.ngrok.io'],
    proxy: {
      '/api': 'http://localhost:5001',
    },
  },
})
