import { configDefaults, defineConfig } from 'vitest/config'
import preact from '@preact/preset-vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  test: {
    exclude: [
      ...configDefaults.exclude,
      '.features-gen/**',
      'playwright-report/**',
      'test-results/**',
    ],
  },
})
