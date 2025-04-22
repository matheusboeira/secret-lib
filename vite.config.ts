import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import path from 'node:path'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    tsConfigPaths(),
    visualizer({
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
      template: 'flamegraph'
    })
  ],
  build: {
    lib: {
      name: 'secret-lib',
      entry: {
        index: path.resolve(__dirname, 'lib/index.ts'),
        hooks: path.resolve(__dirname, 'lib/hooks/index.ts'),
        tooltip: path.resolve(__dirname, 'lib/components/tooltip/index.ts'),
        tags: path.resolve(__dirname, 'lib/components/tags/index.ts')
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) =>
        entryName === 'index'
          ? `index.${format === 'es' ? 'mjs' : 'cjs'}`
          : `lib/components/${entryName}/index.${format === 'es' ? 'mjs' : 'cjs'}`
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'tailwindcss',
        'clsx',
        'tailwind-merge'
      ],
      output: {
        chunkFileNames: 'chunks/[name]-[hash].js'
      }
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
