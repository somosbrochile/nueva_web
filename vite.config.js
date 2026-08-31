import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main:      'index.html',
        about:     'about.html',
        services:  'services.html',
        portfolio: 'portfolio.html',
        contact:   'contact.html',
        blog:      'blog/index.html',
        diagnostico: 'diagnostico-digital.html',
        blogBranding: 'blog/por-que-tu-empresa-necesita-branding.html',
        blogAds: 'blog/publicidad-pagada-vs-contenido-organico.html',
      }
    }
  }
})
