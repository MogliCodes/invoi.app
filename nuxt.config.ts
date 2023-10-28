// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: true,
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase", "@pinia/nuxt"],
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
});
