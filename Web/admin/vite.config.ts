import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@admin": path.resolve(__dirname, "src"),
    },
  },
  root: __dirname,
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    host: true,
    port: 5174,
    allowedHosts: [
      "build.ferixas.com",
      "buildportal.ferixas.com",
      "localhost",
      "127.0.0.1",
    ],
  },
});