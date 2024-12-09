// nuxt.config.ts
export default defineNuxtConfig({
  pages: true,
  modules: [
    '@nuxt/icon', // Module mis à jour
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
  ],
  compatibilityDate: '2024-12-09',
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_API_URL || 'http://localhost:3000',
    },
  },
  devtools: { enabled: false },
});
