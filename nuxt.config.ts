// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-12-09', // Ajoutez cette ligne
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_API_URL || 'http://localhost:3000' // Exemple d'ajout si besoin
    }
  }
})
