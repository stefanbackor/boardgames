import { defineConfig, loadEnv, type Plugin } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import { withoutAnalytics } from './src/utils/analyticsHtml'

/**
 * Leaves the Google tag out of index.html for deployments built with
 * VITE_DISABLE_ANALYTICS=true - see src/utils/analyticsHtml.ts
 */
function analyticsSwitch(disabled: boolean): Plugin {
  return {
    name: 'analytics-switch',
    transformIndexHtml: (html) => (disabled ? withoutAnalytics(html) : html),
  }
}

const config = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    plugins: [
      TanStackRouterVite(),
      devtools(),
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      react(),
      analyticsSwitch(env.VITE_DISABLE_ANALYTICS === 'true'),
    ],
    build: {
      sourcemap: false,
    },
  }
})

export default config
