import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

import { version as pkgVersion } from './package.json'

const host = process.env.TAURI_DEV_HOST
const platform = process.env.TAURI_ENV_PLATFORM

process.env.VITE_APP_VERSION = pkgVersion
if (process.env.NODE_ENV === 'production') {
  process.env.VITE_APP_BUILD_EPOCH = new Date().getTime().toString()
}

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorMaxWorkers: true,
  },
  clearScreen: false,
  envPrefix: ['VITE_', 'TAURI_'],
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      ignored: ['**/src-tauri/**'],
    },
  },
  build: {
    outDir: './dist',
    target: platform === 'windows' ? 'chrome111' : 'safari16.4',
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    emptyOutDir: true,
    chunkSizeWarningLimit: 1024,
    sourcemap: !!process.env.TAURI_ENV_DEBUG,
  },
})
