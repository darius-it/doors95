// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  css: ["@/assets/css/main.css"],
  compatibilityDate: "2025-05-15",

  devtools: { enabled: true },
  vite: {
    plugins: [
      tailwindcss()
    ],  
  },
})