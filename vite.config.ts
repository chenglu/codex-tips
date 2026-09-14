import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { seoPlugin } from "./vite-seo-plugin";

const base = process.env.SITE_BASE ?? "/";

if (process.env.SITE_URL && !process.env.VITE_SITE_URL) {
  process.env.VITE_SITE_URL = process.env.SITE_URL;
}
process.env.VITE_SITE_URL ??= "https://codex.tips";

function redirectRootToBase() {
  return (req: { url?: string }, res: { statusCode: number; setHeader: (k: string, v: string) => void; end: () => void }, next: () => void) => {
    if (base === "/" || base === "./") {
      next();
      return;
    }
    const url = req.url ?? "/";
    if (url === "/" || url === "/index.html") {
      res.statusCode = 302;
      res.setHeader("Location", base);
      res.end();
      return;
    }
    next();
  };
}

export default defineConfig({
  plugins: [
    react(),
    seoPlugin(),
    {
      name: "redirect-root-to-base",
      configureServer(server) {
        server.middlewares.use(redirectRootToBase());
      },
      configurePreviewServer(server) {
        server.middlewares.use(redirectRootToBase());
      },
    },
  ],
  base,
  appType: "spa",
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
  preview: {
    host: "127.0.0.1",
    port: 4173,
  },
});
