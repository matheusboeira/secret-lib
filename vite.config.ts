import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.ts'),
      name: 'SecretLib',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'tailwindcss', 'tailwind-variants']
    },
    sourcemap: true,
    outDir: 'dist',
    target: 'esnext',
    minify: true
  },
  css: {
    postcss: './postcss.config.js'
  }
})
