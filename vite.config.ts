import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import path from 'node:path'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    return {
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
            autocomplete: path.resolve(
              __dirname,
              'lib/components/autocomplete/index.ts'
            )
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
    }
  }

  return {
    plugins: [react(), tsConfigPaths()],
    build: {
      outDir: 'preview'
    },
    css: {
      postcss: './postcss.config.js'
    }
  }
})
