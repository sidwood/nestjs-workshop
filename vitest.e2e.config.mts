import { defineConfig } from 'vitest/config'
import { fileURLToPath, URL } from 'node:url'
import swc from 'unplugin-swc'

export default defineConfig({
  test: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      test: fileURLToPath(new URL('./test', import.meta.url)),
    },
    globals: true,
    include: ['test/**/*.spec.ts'],
    root: './',
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})
