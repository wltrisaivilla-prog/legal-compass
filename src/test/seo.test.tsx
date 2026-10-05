import { readFileSync } from "node:fs";
import { render, cleanup, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import RouteSeo from "@/seo/RouteSeo";
import { applyRouteSeo } from "@/seo/head";
import { routeSeo, SITE_URL } from "@/seo/routes";
import { faqs } from "@/seo/faqs";

afterEach(() => { cleanup(); document.head.innerHTML = ""; });

describe("route SEO", () => {
  for (const [path, seo] of Object.entries(routeSeo)) {
    it(`sets unique metadata for ${path}`, () => {
      render(<MemoryRouter initialEntries={[path]}><RouteSeo /></MemoryRouter>);
      expect(document.title).toBe(seo.title);
      expect(document.querySelector('meta[name="description"]')).toHaveAttribute("content", seo.description);
      expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute("href", SITE_URL + path);
      for (const [attribute, key, value] of [
        ["property", "og:title", seo.title], ["property", "og:description", seo.description],
        ["property", "og:url", SITE_URL + path], ["name", "twitter:title", seo.title],
        ["name", "twitter:description", seo.description],
      ]) {
        expect(document.querySelectorAll(`meta[${attribute}="${key}"]`)).toHaveLength(1);
        expect(document.querySelector(`meta[${attribute}="${key}"]`)).toHaveAttribute("content", value);
      }
      expect(document.querySelectorAll("#faq-schema")).toHaveLength(path === "/faq" ? 1 : 0);
    });
  }

  it("reuses tags, removes FAQ on navigation and preserves business schema", () => {
    const html = readFileSync("index.html", "utf8");
    document.head.innerHTML = html.match(/<head>([\s\S]*?)<\/head>/)![1];
    const business = document.querySelector("#business-schema")!.textContent;
    const graph = JSON.parse(business!)["@graph"];
    expect(graph.map((entry: { "@type": string }) => entry["@type"])).toEqual(["LegalService", "WebSite"]);
    act(() => { applyRouteSeo("/faq"); applyRouteSeo("/faq/"); });
    expect(document.querySelectorAll("#faq-schema")).toHaveLength(1);
    expect(JSON.parse(document.querySelector("#faq-schema")!.textContent!).mainEntity).toHaveLength(faqs.length);
    for (const path of Object.keys(routeSeo)) act(() => applyRouteSeo(path));
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(document.querySelector("#faq-schema")).toBeNull();
    expect(document.querySelector("#business-schema")!.textContent).toBe(business);
    applyRouteSeo("/no-existe");
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
    applyRouteSeo("/");
    expect(document.querySelector('meta[name="robots"]')!.getAttribute("content")).toContain("index, follow");
  });
});
