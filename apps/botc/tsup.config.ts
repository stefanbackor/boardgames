import { defineConfig } from 'tsup'

export default defineConfig({
  // Bundle all API functions
  entry: ['src/api/og.ts'],

  // Output to api/ directory (built files separate from source)
  outDir: 'dist/api',

  // Format as ES Module (matches package.json "type": "module")
  format: ['esm'],

  // Generate .js files
  outExtension: () => ({ js: '.js' }),

  // Don't generate declaration files
  dts: false,

  // Explicitly enable bundling (bundles all imports into single file)
  bundle: true,

  // Don't split code into chunks - keep everything in one file
  splitting: false,

  // Bundle ALL dependencies into the output file (except external ones)
  noExternal: [/.*/],

  // Keep @vercel/node external (provided by Vercel runtime)
  external: ['@vercel/node'],

  // Target Node.js 24 (Vercel runtime)
  target: 'node24',

  // Clean output directory before build
  clean: false, // Don't clean since we're overwriting source files

  // Minify for production
  minify: false,

  // Generate sourcemaps for debugging
  sourcemap: false,

  // Tree-shake unused code for smaller bundle
  treeshake: true,

  // Disable platform-specific handling that might cause splitting
  platform: 'node',
})
