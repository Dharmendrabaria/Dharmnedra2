import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': resolve(__dirname, 'src') } },
  build: {
    target: 'esnext',
    cssMinify: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router-dom/'))
            return 'react-vendor';
          if (id.includes('node_modules/three/') || id.includes('node_modules/@react-three/'))
            return 'three-vendor';
          if (id.includes('node_modules/framer-motion/') || id.includes('node_modules/gsap/'))
            return 'motion-vendor';
          if (id.includes('node_modules/react-icons/') || id.includes('node_modules/swiper/'))
            return 'ui-vendor';
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'gsap'],
  },
})
