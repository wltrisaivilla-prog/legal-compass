import { getRouteMetadata } from "./metadata";

function setMeta(attribute: "name" | "property", key: string, content: string) {
  const matches = document.head.querySelectorAll<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  const element = matches[0] ?? document.createElement("meta");
  element.setAttribute(attribute, key);
  element.content = content;
  if (!element.isConnected) document.head.append(element);
  matches.forEach((match, index) => { if (index > 0) match.remove(); });
}

export function applyRouteSeo(pathname: string) {
  const seo = getRouteMetadata(pathname);
  const url = seo.url;
  document.title = seo.title;
  setMeta("name", "description", seo.description);
  setMeta("name", "robots", seo.robots);
  setMeta("property", "og:title", seo.title);
  setMeta("property", "og:description", seo.description);
  setMeta("property", "og:url", url);
  setMeta("name", "twitter:title", seo.title);
  setMeta("name", "twitter:description", seo.description);
  const canonicals = document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]');
  const canonical = canonicals[0] ?? document.createElement("link");
  canonical.rel = "canonical";
  canonical.href = url;
  if (!canonical.isConnected) document.head.append(canonical);
  canonicals.forEach((element, index) => { if (index > 0) element.remove(); });

  document.head.querySelectorAll('script[data-route-schema], script#faq-schema').forEach(element => element.remove());
  if (seo.faqSchema) {
    const script = document.createElement("script");
    script.id = "faq-schema";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(seo.faqSchema);
    document.head.append(script);
  }
}
