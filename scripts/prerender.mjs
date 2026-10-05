import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { JSDOM } from "jsdom";
import http from "node:http";
import https from "node:https";
import net from "node:net";
import tls from "node:tls";

// Match the client build: external SSR dependencies must use production branches.
process.env.NODE_ENV ??= "production";

// Rendering is offline. Fail immediately if a future component attempts a request.
const offline = () => { throw new Error("Network access is forbidden during prerender"); };
globalThis.fetch = offline;
http.request = http.get = https.request = https.get = offline;
net.connect = net.createConnection = tls.connect = offline;

const { render, renderMetadata, routeSeo, SITE_URL, getSiteYear } = await import("../.prerender/entry-server.js");
const buildYear = getSiteYear();
const template = readFileSync("dist/index.html", "utf8");
if (!template.includes("<!--app-html-->")) throw new Error("Missing prerender outlet");
const bodies = new Set();
const titles = new Set();

for (const pathname of Object.keys(routeSeo)) {
  const markup = render(pathname, buildYear);
  if (!markup.includes("<h1")) throw new Error(`Missing heading: ${pathname}`);
  const html = renderMetadata(template, pathname)
    .replace('<div id="root">', `<div id="root" data-prerendered="true" data-build-year="${buildYear}">`)
    .replace("<!--app-html-->", () => markup);
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const expected = routeSeo[pathname];
  if (doc.title !== expected.title || titles.has(doc.title)) throw new Error(`Invalid title: ${pathname}`);
  if (bodies.has(markup)) throw new Error(`Duplicate body: ${pathname}`);
  titles.add(doc.title);
  bodies.add(markup);
  for (const [selector, attribute, value] of [
    ['meta[name="description"]', "content", expected.description],
    ['link[rel="canonical"]', "href", `${SITE_URL}${pathname}`],
    ['meta[property="og:title"]', "content", expected.title],
    ['meta[property="og:description"]', "content", expected.description],
    ['meta[property="og:url"]', "content", `${SITE_URL}${pathname}`],
    ['meta[name="twitter:title"]', "content", expected.title],
    ['meta[name="twitter:description"]', "content", expected.description],
  ]) {
    const elements = doc.querySelectorAll(selector);
    if (elements.length !== 1 || elements[0].getAttribute(attribute) !== value) throw new Error(`Invalid metadata: ${pathname} ${selector}`);
  }
  if (doc.querySelectorAll("#faq-schema").length !== (pathname === "/faq" ? 1 : 0)) throw new Error(`Invalid FAQ schema: ${pathname}`);
  if (doc.querySelectorAll("#business-schema").length !== 1) throw new Error(`Duplicate business schema: ${pathname}`);
  for (const image of doc.querySelectorAll("img[src]")) {
    if (!existsSync(`dist${image.getAttribute("src")}`)) throw new Error(`Missing static image: ${pathname}`);
  }
  if ([...doc.querySelectorAll("[style]")].some(element => element.style.opacity === "0")) throw new Error(`Invisible initial content: ${pathname}`);
  dom.window.close();
  const directory = pathname === "/" ? "dist" : `dist${pathname}`;
  mkdirSync(directory, { recursive: true });
  writeFileSync(`${directory}/index.html`, html);
  console.log(`Prerendered ${pathname}: ${Buffer.byteLength(html)} bytes`);
}

// Unknown routes use client rendering, never hydrate the home page as another URL.
writeFileSync("dist/spa.html", renderMetadata(template, "/404")
  .replace("<!--app-html-->", "<h1>Página no encontrada</h1>"));
