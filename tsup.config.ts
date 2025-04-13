import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['lib/index.ts'],
  dts: true,
  format: ['esm', 'cjs'],
  outDir: 'dist',
  splitting: false,
  sourcemap: true,
  clean: true,
  target: 'esnext',
  treeshake: true,
  external: ['react', 'react-dom']
})
