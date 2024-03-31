import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";


const aliases = ['assets', 'components', 'data', 'store', 'models', 'helpers', "routes"];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: aliases.map(alias => (
      {
        find: `@${alias}`,
        replacement: path.resolve(__dirname, `src/${alias}`),
      },
    ))
  },

})
