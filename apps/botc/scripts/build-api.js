#!/usr/bin/env node
import { execSync } from 'child_process'
import {
  readdirSync,
  readFileSync,
  writeFileSync,
  renameSync,
  existsSync,
} from 'fs'
import { join, dirname, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const tsconfigMain = join(root, 'tsconfig.json')
const tsconfigBackup = join(root, 'tsconfig.json.backup')
const tsconfigApi = join(root, 'tsconfig.api.json')

// Get all .ts files from api/ folder (excluding .test.ts)
const apiDir = join(root, 'api')
const apiFiles = readdirSync(apiDir).filter(
  (file) => file.endsWith('.ts') && !file.endsWith('.test.ts'),
)

if (apiFiles.length === 0) {
  console.log('No API files to build')
  process.exit(0)
}

try {
  // ncc doesn't support --tsconfig flag, so we temporarily swap configs
  // tsconfig.api.json overrides settings incompatible with ncc bundling
  renameSync(tsconfigMain, tsconfigBackup)
  renameSync(tsconfigApi, tsconfigMain)

  console.log(`Building ${apiFiles.length} API file(s) with @vercel/ncc...`)

  // Build each API file
  for (const file of apiFiles) {
    const baseName = basename(file, '.ts')
    const sourceFile = join('api', file)
    const outputFile = join('api', `${baseName}.js`)
    const tempOutputDir = join('api', `.build-${baseName}`)

    console.log(`  Building ${file}...`)

    // Build to temp directory (no minification for better debugging)
    execSync(`ncc build ${sourceFile} -o ${tempOutputDir}`, {
      stdio: 'inherit',
      cwd: root,
    })

    // Read the built file
    const builtFile = join(root, tempOutputDir, 'index.js')
    let code = readFileSync(builtFile, 'utf-8')

    // Convert ESM exports to CommonJS for Vercel compatibility
    // ncc outputs: export { __webpack_exports__default as default };
    // We need: module.exports = __webpack_exports__default;
    code = code.replace(
      /export\s*\{\s*(\w+)\s+as\s+default\s*\}\s*;?\s*$/,
      'module.exports = $1;',
    )

    // Write to final location
    writeFileSync(join(root, outputFile), code)

    // Clean up temp directory
    execSync(`rm -rf ${tempOutputDir}`, { cwd: root })

    console.log(`  ✓ ${baseName}.js`)
  }

  console.log('API build complete!')
} finally {
  // Restore original tsconfig files
  if (existsSync(tsconfigMain)) {
    renameSync(tsconfigMain, tsconfigApi)
  }
  if (existsSync(tsconfigBackup)) {
    renameSync(tsconfigBackup, tsconfigMain)
  }
}
