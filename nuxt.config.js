import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // Enable devtools
  devtools: { enabled: true },

  // Modules
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt'
  ],

  // App configuration
  app: {
    head: {
      title: 'GXE',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Vue3 Admin Dashboard' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // CSS
  css: [
    'primevue/resources/themes/lara-light-blue/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    'primeflex/primeflex.css',
    'vue3-toastify/dist/index.css',
    '@/assets/css/tailwind.css',
    '~/assets/css/main.css',
    'video.js/dist/video-js.css'
  ],

  // Build configuration
  build: {
    transpile: ['primevue'],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {}
      }
    }
  },

  // Vite configuration
  vite: {
    optimizeDeps: {
      include: ['primevue']
    },
  },

  // Runtime configuration
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://gxe.test/api-cms',
      appName: process.env.NUXT_PUBLIC_APP_NAME,
      appDescription: process.env.NUXT_PUBLIC_APP_DESCRIPTION,
      enableDarkMode: process.env.NUXT_PUBLIC_ENABLE_DARK_MODE === 'true',
      enableAnalytics: process.env.NUXT_PUBLIC_ENABLE_ANALYTICS === 'true',
      baseUrl: process.env.NODE_ENV === 'development' 
        ? 'http://localhost:5173' 
        : process.env.BASE_URL
    }
  },

  // Nitro configuration
  nitro: {
    compressPublicAssets: true,
    minify: true,
    devProxy: {
      '/youtube': {
        target: 'https://www.youtube.com',
        changeOrigin: true,
        secure: false
      }
    }
  },

  // Development tools
  typescript: {
    strict: false,
    typeCheck: false
  },

  // Module configuration
  pinia: {
    autoImports: ['defineStore', 'storeToRefs']
  },

  // Components configuration
  components: {
    dirs: [
      '~/components',
      '~/components/common',
      '~/components/forms',
      '~/components/layouts'
    ]
  },

  // Plugins configuration
  plugins: [
    '~/plugins/primevue.js',
    '~/plugins/toast.js',
    { src: '~/plugins/videojs.client.js', mode: 'client' }
    // '~/plugins/code-mirror.js'
  ],

  // Middleware configuration
  routeRules: {
    '/admin/**': { middleware: ['auth'] }
  },

  // Experimental features
  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true
  },

  compatibilityDate: '2025-03-29',

  server: {
    port: 5173,
    host: '0.0.0.0',
    timing: false
  },
})