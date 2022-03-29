import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: path.resolve(__dirname, 'lib/index.js'),
      fileName: 'index',
      formats: ['esm'],
    },
  },
})
