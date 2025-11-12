import { defineNuxtConfig } from 'nuxt/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath } from 'url'
import { URL } from 'url'

export default defineNuxtConfig({
  compatibilityDate: '2024-07-01',
  devtools: { enabled: true },

  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
    '@/assets/styles/app.scss',
    '@/assets/styles/vuetify.scss',
    '@/assets/styles/app-B9v0TQbN.css',
    '@/assets/styles/app-Bt7Eyp0A.css',
  ],

  build: {
    transpile: ['vuetify'],
  },
  plugins: [
    {src:'plugins/vuetify.ts',mode: 'all'},
    {src:'plugins/filters.js',mode:'all'},
    {src:'plugins/metaManager.js',mode:'all'},
    {src:'plugins/pageBuilder.js',mode:'all'},
    {src:'plugins/toast.js',mode:'all'},
    {src:'plugins/vueperslides.js',mode:'all'},
    {src:'plugins/vuetifyThemes.js',mode:'all'},
    {src:'plugins/emitter.js',mode:'client'}

  ],
  modules: ['@pinia/nuxt'],

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./', import.meta.url)),
        '~': fileURLToPath(new URL('./', import.meta.url)),
      },
    },

    plugins: [
      tsconfigPaths()  // ✅ این تنها پلاگینی است که در اینجا باید باشد
    ],
  },
})
