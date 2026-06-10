import { reactRouter } from '@react-router/dev/vite'
import { defineConfig as defineViteConfig, mergeConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig as defineVitestConfig } from 'vitest/config'

export default mergeConfig(
  defineViteConfig({
    plugins: [
      // The React Router framework plugin is incompatible with Vitest, so it is
      // only enabled outside of the test runner.
      !process.env.VITEST && reactRouter(),
      tsconfigPaths(),
    ],
    define: {
      'process.env.APP_ENV': JSON.stringify(process.env.VERCEL_ENV),
    },
  }),
  defineVitestConfig({
    test: { globals: true, environment: 'jsdom' },
  }),
)
