// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],

  site: {
    url: 'https://quicktools.web.id',
    name: 'QuickTools'
  },

  sitemap: {
    xslTips: false,
    strictNuxtContentPaths: true
  },

  robots: {
    UserAgent: '*',
    Disallow: '',
    Allow: '/'
  },

  routeRules: {
    '/': { sitemap: { priority: 1.0, changefreq: 'weekly' } },
    '/about': { sitemap: { priority: 0.5, changefreq: 'weekly' } },
    '/privacy-policy': { sitemap: { priority: 0.5, changefreq: 'weekly' } },
    '/terms-of-service': { sitemap: { priority: 0.5, changefreq: 'weekly' } },
    '/tools/*': { sitemap: { priority: 0.8, changefreq: 'weekly' } },
    '/tools/*/*': { sitemap: { priority: 0.7, changefreq: 'weekly' } }
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },

  // Runtime config — public values exposed to client
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:4000/api',
    },
  },

  devtools: { enabled: true },
});
