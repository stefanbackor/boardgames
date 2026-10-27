import { defineConfig } from 'vite'

export default defineConfig({
  resolve: { tsconfigPaths: true },
  define: {
    'process.env.APP_ENV': JSON.stringify('storybook'),
  },
})
