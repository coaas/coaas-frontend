import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_API_HREF, VITE_API_AUTH_HREF } = loadEnv(mode, process.cwd());

  return {
    server: {
      port: 3000,
      proxy:
        (mode === 'development' && {
          '/api': {
            target: `${VITE_API_HREF}/api`,
            changeOrigin: true,
            secure: false,
            ws: true,
            followRedirects: true,
            rewrite: path => path.replace(/^\/api/, ''),
            configure: (proxy, _options) => {
              proxy.on('error', err => {
                console.error('proxy error', err);
              });
              proxy.on('proxyReq', (_, req, _res) => {
                console.log(
                  'Sending Request to the Target:',
                  req.method,
                  req.url,
                );
              });
              proxy.on('proxyRes', (proxyRes, req, _res) => {
                console.log(
                  'Received Response from the Target:',
                  proxyRes.statusCode,
                  req.url,
                );
              });
            },
          },
          '/auth': {
            target: `${VITE_API_AUTH_HREF}/api`,
            changeOrigin: true,
            secure: false,
            ws: true,
            followRedirects: true,
            rewrite: path => path.replace(/^\/auth/, ''),
            configure: (proxy, _options) => {
              proxy.on('error', err => {
                console.error('proxy error', err);
              });
              proxy.on('proxyReq', (_, req, _res) => {
                console.log(
                  'Sending Request to the Target:',
                  req.method,
                  req.url,
                );
              });
              proxy.on('proxyRes', (proxyRes, req, _res) => {
                console.log(
                  'Received Response from the Target:',
                  proxyRes.statusCode,
                  req.url,
                );
              });
            },
          },
        }) ||
        undefined,
    },
    resolve: {
      alias: {
        '@api': path.resolve(__dirname, './src/api'),
        '@components': path.resolve(__dirname, './src/components'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@globalTypes': path.resolve(__dirname, './src/globalTypes'),
        '@scenes': path.resolve(__dirname, './src/scenes'),
      },
    },
    plugins: [react()],
  };
});
