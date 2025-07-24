import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

const host = process.env.TAURI_DEV_HOST

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [vue()],
  resolve: {
    alias: {
      // TODO: Maybe leave ~ only for individual apps and not use on common
      '~': path.resolve(__dirname, './src'),
      stream: 'stream-browserify',
      util: 'util',
      querystring: 'qs',
    },
    dedupe: ['vue'],
  },
  define: {
    // For 'util' polyfill required by dep of '@apidevtools/swagger-parser'
    'process.env': {},
    'process.platform': '"browser"',
  },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1029,
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
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**'],
    },
  },
}))
