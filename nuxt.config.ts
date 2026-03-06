import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2026-01-17',
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vee-validate/nuxt'
  ],
  components: {
    dirs: [
      {
        path: '~/components',
        global: true
      }
    ]
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    // Private keys (only available on the server-side)
    // Public keys that are exposed to the client-side
    // public: {
    //   apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    // }
  },
  // RTL support
  app: {
    head: {
      htmlAttrs: {
        dir: 'rtl',
        lang: 'ar'
      }
    }
  }
})

