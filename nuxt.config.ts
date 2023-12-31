// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      backendBaseUrl: process.env.BACKEND_BASE_URL,
    },
  },
  devtools: true,
  modules: ["@nuxt/ui", "@nuxtjs/supabase", "@pinia/nuxt"],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },
  vite: {
    server: {
      fs: {
        strict: false,
      },
    },
  },
  pinia: {
    autoImports: ["defineStore"],
  },
  nitro: {
    preset: "node-server",
  },
});
