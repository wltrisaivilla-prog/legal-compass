// @vitest-environment node
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { JSDOM } from "jsdom";
import { legalAreas } from "@/data/legal-areas";
import { categorias } from "@/data/services";
import { routeSeo, SITE_URL } from "@/seo/routes";
import { getRouteMetadata, renderMetadata } from "@/seo/metadata";
import { render } from "@/entry-server";

const template = readFileSync("index.html", "utf8");
describe("legal area content, schema and discovery", () => {
  it("covers exactly twelve unique routes in sitemap and crawler guidance", () => {
    expect(Object.keys(routeSeo)).toHaveLength(12);
    expect(new Set(Object.values(routeSeo).map(seo => seo.title)).size).toBe(12);
    const sitemap = new JSDOM(readFileSync("public/sitemap.xml", "utf8"), { contentType: "text/xml" });
    const urls = [...sitemap.window.document.querySelectorAll("loc")].map(loc => loc.textContent);
    expect(urls.sort()).toEqual(Object.keys(routeSeo).map(path => SITE_URL + path).sort());
    expect(sitemap.window.document.querySelector("lastmod")).toBeNull();
    const llms = readFileSync("public/llms.txt", "utf8");
    for (const area of legalAreas) expect(llms).toContain(SITE_URL + area.path);
    sitemap.window.close();
  });
  for (const area of legalAreas) it(`renders useful catalog-backed content and linked schemas for ${area.path}`, () => {
    const words = area.intro.join(" ").trim().split(/\s+/).length;
    expect(words).toBeGreaterThanOrEqual(150);
    expect(words).toBeLessThanOrEqual(250);
    expect(area.faqs.length).toBeGreaterThanOrEqual(3);
    expect(area.faqs.length).toBeLessThanOrEqual(5);
    const html = renderMetadata(template, area.path).replace("<!--app-html-->", () => render(area.path, 2026));
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    expect(doc.querySelectorAll("h1")).toHaveLength(1);
    expect(doc.querySelector("h1")?.textContent).toBe(area.name + " en Guatemala");
    for (const service of categorias.find(category => category.title === area.category)!.servicios) expect(doc.querySelector("main")?.textContent).toContain(service);
    const service = JSON.parse(doc.querySelector("#service-schema")!.textContent!);
    expect(service["@type"]).toBe("Service");
    expect(service.provider).toEqual({ "@id": SITE_URL + "/#firma" });
    expect(service.areaServed).toBe("Guatemala");
    expect(service.url).toBe(SITE_URL + area.path);
    const faq = JSON.parse(doc.querySelector("#faq-schema")!.textContent!);
    expect(faq.mainEntity.map((question: { name: string }) => question.name)).toEqual(area.faqs.map(item => item.q));
    for (const question of area.faqs) expect(doc.querySelector("main")?.textContent).toContain(question.a);
    expect(doc.querySelector('a[data-intent="service_inquiry"]')).toBeTruthy();
    expect(doc.querySelector('a[href="/contacto"]')).toBeTruthy();
    expect(doc.querySelector('a[href="/servicios"]')).toBeTruthy();
    const repeated = new JSDOM(renderMetadata(html, area.path));
    expect(repeated.window.document.querySelectorAll("#service-schema")).toHaveLength(1);
    expect(repeated.window.document.querySelectorAll("#faq-schema")).toHaveLength(1);
    expect(getRouteMetadata("/contacto").serviceSchema).toBeNull();
    expect(renderMetadata(html, "/contacto")).not.toContain('id="service-schema"');
    for (const path of area.related) expect(legalAreas.some(item => item.path === path)).toBe(true);
    dom.window.close(); repeated.window.close();
  });
});
