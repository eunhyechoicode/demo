import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Use polling for file changes
    },
    host: '0.0.0.0', // Allow connections from outside the container
    port: 5173,      // Match the exposed port
  },
})