import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
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
  runtimeConfig: {},
  app: {
    head: {
      htmlAttrs: {
        dir: 'rtl',
        lang: 'ar'
      }
    }
  },
  devServer: {
    port: 5000,
    host: '0.0.0.0'
  },
  vite: {
    server: {
      allowedHosts: true,
      hmr: {
        clientPort: 443,
        protocol: 'wss'
      }
    }
  }
})
