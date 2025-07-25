// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    // 私有键（只在服务器端可用）
    // apiSecret: '123',
    
    // 公共键（暴露给客户端）
    public: {
      API_BASE: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8080/api'
    }
  }
})
