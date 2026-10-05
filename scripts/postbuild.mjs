import { copyFileSync, existsSync } from "node:fs";

// Explicitly include hidden Apache configuration in manual deployment artifacts.
for (const file of [".htaccess", "_redirects", "robots.txt", "sitemap.xml", "llms.txt"]) {
  copyFileSync(`public/${file}`, `dist/${file}`);
  if (!existsSync(`dist/${file}`)) throw new Error(`Missing deployment file: ${file}`);
}
