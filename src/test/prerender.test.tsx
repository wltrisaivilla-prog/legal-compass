import { getRouteMetadata } from "@/seo/metadata";
// @vitest-environment node
import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { JSDOM } from "jsdom";
import { render } from "@/entry-server";
import { renderMetadata } from "@/seo/metadata";
import { routeSeo, SITE_URL } from "@/seo/routes";

const template = readFileSync("index.html", "utf8");
const content: Record<string, string> = {
  "/": "Bienvenido a Litigios de Guatemala",
  "/quienes-somos": "Fundada en 1999",
  "/servicios": "Despidos injustificados",
  "/documentos": "Contrato de Compraventa de Inmueble",
  "/faq": "La primera consulta es gratuita",
  "/contacto": "Envíenos un Mensaje",
};

describe("offline static rendering", () => {
  for (const [path, seo] of Object.entries(routeSeo)) {
    it(`renders content and metadata without browser APIs for ${path}`, () => {
      const fetch = vi.spyOn(globalThis, "fetch").mockImplementation(() => { throw new Error("Unexpected network"); });
      try {
        expect(typeof window).toBe("undefined");
        const markup = render(path, 2026);
        const html = renderMetadata(template, path).replace("<!--app-html-->", () => markup);
        const dom = new JSDOM(html);
        const doc = dom.window.document;
        expect(doc.querySelector("h1")?.textContent).toBeTruthy();
        expect(doc.querySelector("main")?.textContent).toContain(content[path] ?? "Servicios que atendemos");
        expect(doc.title).toBe(seo.title);
        expect(doc.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(SITE_URL + path);
        expect(doc.querySelectorAll("#faq-schema")).toHaveLength(getRouteMetadata(path).faqSchema ? 1 : 0);
        expect(doc.querySelectorAll("#business-schema")).toHaveLength(1);
        expect(markup).not.toContain('opacity:0');
        expect(markup).not.toContain("paypal.com/sdk");
        expect(fetch).not.toHaveBeenCalled();
        dom.window.close();
      } finally { fetch.mockRestore(); }
    });
  }

  it("keeps metadata idempotent when switching routes", () => {
    const once = renderMetadata(template, "/faq");
    const twice = renderMetadata(once, "/faq");
    const doc = new JSDOM(twice).window.document;
    expect(doc.querySelectorAll("#faq-schema")).toHaveLength(1);
    expect(doc.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(doc.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(renderMetadata(twice, "/servicios")).not.toContain('id="faq-schema"');
  });
});
