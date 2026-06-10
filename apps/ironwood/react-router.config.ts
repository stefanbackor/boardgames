import type { Config } from '@react-router/dev/config'

export default {
  // SPA mode: render entirely on the client, no server-side rendering.
  // The app is deployed to Vercel as a static build (see vercel.json), so no
  // Vercel framework preset is needed.
  ssr: false,
} satisfies Config
