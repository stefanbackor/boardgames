import { vitePlugin as remix } from '@remix-run/dev'
import { vercelPreset } from '@vercel/remix/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    remix({
      presets: [vercelPreset()],
      ssr: false,
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
  define: {
    'process.env.APP_ENV': JSON.stringify(process.env.VERCEL_ENV),
  },
})
