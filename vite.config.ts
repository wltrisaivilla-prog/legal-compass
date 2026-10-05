import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { existsSync } from "node:fs";
import { routeSeo } from "./src/seo/routes";

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger(), {
    name: "preview-static-routes",
    configurePreviewServer(server) {
      // Vite's SPA fallback otherwise serves home HTML for extensionless routes.
      // Mirror Apache's static-page priority when testing the production build.
      server.middlewares.use((request, response, next) => {
        const url = new URL(request.url ?? "/", "http://preview.local");
        const pathname = url.pathname.replace(/\/+$/, "") || "/";
        const withoutIndex = pathname.replace(/\/index\.html$/, "") || "/";
        if (pathname.endsWith("/index.html") && routeSeo[withoutIndex]) {
          response.writeHead(301, { Location: withoutIndex + url.search });
          response.end();
          return;
        }
        if (routeSeo[pathname] && pathname !== "/") {
          request.url = `${pathname}/index.html${url.search}`;
        } else if (!routeSeo[pathname] && !pathname.includes(".") && !existsSync(path.resolve("dist", `.${pathname}`))) {
          request.url = `/spa.html${url.search}`;
        }
        next();
      });
    },
  }].filter(Boolean),
  build: { copyPublicDir: !isSsrBuild },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
