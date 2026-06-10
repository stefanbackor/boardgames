import type { Config } from '@react-router/dev/config'
import { vercelPreset } from '@vercel/react-router/vite'

export default {
  // SPA mode: render entirely on the client, no server-side rendering.
  ssr: false,
  presets: [vercelPreset()],
} satisfies Config
