import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  base: process.env.NODE_ENV === "production" ? "/registration/" : "/",
  build: {
    outDir: "dist",
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/global.scss";`,
      },
    },
  },
});
