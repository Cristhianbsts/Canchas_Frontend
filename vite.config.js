import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const FALLBACK_API_URL = 'https://canchasbackend.vercel.app/api'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    server: {
      port: 3001
    },
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(
        env.VITE_API_URL || FALLBACK_API_URL
      ),
    },
  }
})
