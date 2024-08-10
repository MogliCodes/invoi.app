// https://nuxt.com/docs/api/configuration/nuxt-config
import pkg from "./package.json";

export default defineNuxtConfig({
  ui: {
    icons: ["material-symbols", "heroicons"],
  },
  runtimeConfig: {
    public: {
      debug: process.env.NUXT_PUBLIC_DEBUG,
      BACKEND_BASE_URL: process.env.NUXT_PUBLIC_BACKEND_BASE_URL,
      clientVersion: pkg.version,
    },
  },
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
