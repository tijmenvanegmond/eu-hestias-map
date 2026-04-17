import { resolve } from 'path';
import { defineConfig } from 'vite';
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
  base: './',
  plugins: [yaml()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        charter: resolve(__dirname, 'src/charter.html'),
        manifesto: resolve(__dirname, 'src/manifesto.html'),
        commentary: resolve(__dirname, 'src/commentary.html'),
      },
    },
  },
});
