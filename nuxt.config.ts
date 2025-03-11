import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  app: {
    head: {
      title: "My Nuxt 3 App",
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
    },
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE_URL || "https://api.example.com",
    },
  },

  http: {
    baseURL: process.env.NUXT_PUBLIC_API_BASE_URL || "https://api.example.com",
  },

  components: [
    { path: "~/components", pathPrefix: false }, // Auto-import tất cả component trong `components/`
  ],

  modules: [
    "@nuxtjs/tailwindcss", // Cấu hình Tailwind CSS
    "@vueuse/nuxt", // Sử dụng VueUse composables
    "@pinia/nuxt", // Quản lý state với Pinia
  ],

  css: [
    "~/assets/css/tailwind.css",
    "vue3-easy-data-table/dist/style.css"
  ],

  tailwindcss: {
    viewer: false,
  },

  build: {
    transpile: ['vue3-easy-data-table']
  },

  plugins: [
    '~/plugins/data-table.ts',
    '~/plugins/toast.ts'
  ],

  // Đăng ký middleware
  nitro: {
    routeRules: {
      '/**': { cors: true }
    }
  },

  server: {
    port: 8000,
  },

  compatibilityDate: "2025-03-07",
});