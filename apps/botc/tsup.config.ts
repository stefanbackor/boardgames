import { defineConfig } from 'tsup'

export default defineConfig({
  // Bundle all API functions
  entry: ['api/og.ts'],

  // Output to api/ directory (will replace source files)
  outDir: 'api',

  // Format as CommonJS for Vercel serverless functions
  format: ['cjs'],

  // Generate .js files
  outExtension: () => ({ js: '.js' }),

  // Don't generate declaration files
  dts: false,

  // Don't split code
  splitting: false,

  // Bundle all dependencies except @vercel/node
  noExternal: [/.*/],
  external: ['@vercel/node'],

  // Target Node.js 24 (Vercel runtime)
  target: 'node24',

  // Clean output directory before build
  clean: false, // Don't clean since we're overwriting source files

  // Minify for production
  minify: false,

  // Generate sourcemaps for debugging
  sourcemap: false,

  // Preserve original file structure
  treeshake: true,
})
