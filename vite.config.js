import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import useExpressInVite from "./src/server/utils/useExpressInVite";
import { vitePlugin as multipageFallback } from "multipage-fallback";

// https://vitejs.dev/config/
export default defineConfig({
  appType: "mpa",
  server: { port: 3005 },
  plugins: [
    useExpressInVite("/src/server/router.js", true),
    multipageFallback(),
    react(),
  ],
  build: {
    target: "es6",
    rollupOptions: {
      input: ["/index.html", "/tools/tbf/index.html"],
    },
  },
  define: {
    BUILD_TIMESTAMP: Date.now(),
  },
});
