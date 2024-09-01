// https://nuxt.com/docs/api/configuration/nuxt-config
import pkg from "./package.json";

export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: "icon", type: "image/png", href: "/invoi.svg" }],
    },
  },
  runtimeConfig: {
    public: {
      debug: process.env.NUXT_PUBLIC_DEBUG,
      BACKEND_BASE_URL: process.env.NUXT_PUBLIC_BACKEND_BASE_URL,
      clientVersion: pkg.version,
    },
    secretKey: process.env.SECRET_KEY,
  },
  modules: ["@nuxt/ui", "@pinia/nuxt"],
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
