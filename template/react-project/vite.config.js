import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      include: ["./src/**/*.js", ".src/**/*.jsx"],
    }),
  ],
  server: {
    host: "{{host}}",
    port: 4000,
    proxy: {
      "/api": {
        target: "http://{{proxy}}",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          "primary-color": "#4762fe",
        },
      },
    },
  },
});
