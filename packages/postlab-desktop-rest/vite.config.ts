import { defineConfig, loadEnv, normalizePath } from 'vite'
import { APP_INFO, META_TAGS } from './meta'
import { viteStaticCopy as StaticCopy } from 'vite-plugin-static-copy'
import HtmlConfig from 'vite-plugin-html-config'
import Vue from '@vitejs/plugin-vue'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import Inspect from 'vite-plugin-inspect'
import { VitePWA } from 'vite-plugin-pwa'
import * as path from 'path'
import legacy from '@vitejs/plugin-legacy'

const host = process.env.TAURI_DEV_HOST
const ENV = loadEnv('development', path.resolve(__dirname, '../../'))

export default defineConfig({
  envDir: path.resolve(__dirname, '../../'),
  // TODO: Migrate @postlab/types to full ESM
  define: {
    // For 'util' polyfill required by dep of '@apidevtools/swagger-parser'
    'process.env': {},
  },
  publicDir: path.resolve(__dirname, '../postlab-component-rest/public'),
  build: {
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      maxParallelFileOps: 2,
    },
  },
  resolve: {
    alias: {
      // TODO: Maybe leave ~ only for individual apps and not use on common
      '~': path.resolve(__dirname, '../postlab-component-rest/src'),
      stream: 'stream-browserify',
      util: 'util',
      querystring: 'qs',
    },
    dedupe: ['vue'],
  },
  plugins: [
    Inspect(), // go to url -> /__inspect
    HtmlConfig({
      metas: META_TAGS(ENV),
    }),
    Vue(),
    StaticCopy({
      targets: [
        {
          src: normalizePath(path.resolve(__dirname, './.sitemap-gen/*')),
          dest: normalizePath(path.resolve(__dirname, './dist')),
        },
      ],
    }),
    VueI18n({
      runtimeOnly: false,
      compositionOnly: true,
      include: [path.resolve(__dirname, 'locales')],
    }),
    VitePWA({
      manifest: {
        name: APP_INFO.name,
        short_name: APP_INFO.name,
        description: APP_INFO.shortDescription,
        start_url: '/?source=pwa',
        background_color: APP_INFO.app.background,
        theme_color: APP_INFO.app.background,
        icons: [
          {
            src: '/icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/logo.svg',
            sizes: '48x48 72x72 96x96 128x128 256x256 512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      registerType: 'prompt',
      workbox: {
        cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: 4194304,
        navigateFallbackDenylist: [
          /robots.txt/,
          /sitemap.xml/,
          /discord/,
          /telegram/,
          /beta/,
          /careers/,
          /newsletter/,
          /twitter/,
          /github/,
          /announcements/,
        ],
      },
    }),
    legacy({
      modernPolyfills: ['es.string.replace-all'],
      renderLegacyChunks: false,
    }),
  ],
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
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
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**'],
    },
  },
})
