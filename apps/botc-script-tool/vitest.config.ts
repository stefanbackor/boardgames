import { defineConfig } from 'vitest/config'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import preact from '@preact/preset-vite'

export default defineConfig({
  plugins: [
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    preact(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
