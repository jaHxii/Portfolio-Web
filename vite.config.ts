import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: '::',
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'production' &&
      visualizer({
        filename: 'dist/stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Code splitting configuration
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
          'radix-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
          ],
        },
        // Optimize chunk file names
        chunkFileNames: chunkInfo => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId
                .split('/')
                .pop()
                ?.replace(/\.[^.]*$/, '')
            : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        },
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: assetInfo => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext || '')) {
            return `images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext || '')) {
            return `css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    // Performance optimizations
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: mode === 'development',
    // Performance budgets
    chunkSizeWarningLimit: 1000,
    // Enable tree shaking
    cssCodeSplit: true,
    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  // Image optimization (handled by Vite's built-in asset processing)
  assetsInclude: ['**/*.webp', '**/*.avif'],
  // Performance optimizations for development
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
    ],
    exclude: ['@vite/client', '@vite/env'],
  },
}));
