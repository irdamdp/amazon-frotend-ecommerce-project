import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://fakestoreapi.com/",
        changeOrigin: true,
        // secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
