import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const port = env.PORT ? +JSON.stringify(env.PORT).replace(/"/g, "") : 3000;

  return {
    // vite config
    define: {
      APP_ENV: JSON.stringify(env.APP_ENV),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@components": path.resolve(__dirname, "./src/components"),
      },
    },
    plugins: [react()],
    server: {
      host: true,
      port: 5173,
      watch: {
        usePolling: true,
      },
    },
    preview: {
      port,
      host: true,
    },
  };
});
