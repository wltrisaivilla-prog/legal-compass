import { faqs } from "./faqs";
import { routeSeo, SITE_URL } from "./routes";

function setMeta(attribute: "name" | "property", key: string, content: string) {
  const matches = document.head.querySelectorAll<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  const element = matches[0] ?? document.createElement("meta");
  element.setAttribute(attribute, key);
  element.content = content;
  if (!element.isConnected) document.head.append(element);
  matches.forEach((match, index) => { if (index > 0) match.remove(); });
}

export function applyRouteSeo(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const seo = routeSeo[path] ?? {
    title: "Página no encontrada | Litigios de Guatemala",
    description: "La página solicitada no está disponible. Consulte los servicios y la información de contacto de Litigios de Guatemala.",
  };
  const url = `${SITE_URL}${path}`;
  document.title = seo.title;
  setMeta("name", "description", seo.description);
  setMeta("name", "robots", routeSeo[path] ? "index, follow, max-snippet:-1, max-image-preview:large" : "noindex, follow");
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
  if (path === "/faq") {
    const script = document.createElement("script");
    script.id = "faq-schema";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${SITE_URL}/faq#faq`,
      mainEntity: faqs.map(faq => ({
        "@type": "Question", name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    });
    document.head.append(script);
  }
}
