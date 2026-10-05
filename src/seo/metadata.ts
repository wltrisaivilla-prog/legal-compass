import { legalAreas } from "../data/legal-areas";
import { faqs } from "./faqs";
import { routeSeo, SITE_URL } from "./routes";

export function getRouteMetadata(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const area = legalAreas.find(item => item.path === path);
  const questions = path === "/faq" ? faqs : area?.faqs;
  return {
    path,
    url: `${SITE_URL}${path}`,
    ...(routeSeo[path] ?? {
      title: "Página no encontrada | Litigios de Guatemala",
      description: "La página solicitada no está disponible. Consulte los servicios y la información de contacto de Litigios de Guatemala.",
    }),
    robots: routeSeo[path] ? "index, follow, max-snippet:-1, max-image-preview:large" : "noindex, follow",
    serviceSchema: area ? {
      "@context": "https://schema.org", "@type": "Service",
      "@id": `${SITE_URL}${path}#service`, name: area.name, serviceType: area.name,
      url: `${SITE_URL}${path}`, description: area.description,
      provider: { "@id": `${SITE_URL}/#firma` }, areaServed: "Guatemala",
    } : null,
    faqSchema: questions ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${SITE_URL}${path}#faq`,
      mainEntity: questions.map(faq => ({
        "@type": "Question", name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    } : null,
  };
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]!);
}

export function renderMetadata(template: string, pathname: string) {
  const seo = getRouteMetadata(pathname);
  let html = template
    .replace(/<script id="(?:faq|service)-schema"[^>]*>[\s\S]*?<\/script>/g, "")
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escapeHtml(seo.title)}</title>`);
  const tags: [string, string, string][] = [
    ["name", "description", seo.description], ["name", "robots", seo.robots],
    ["property", "og:title", seo.title], ["property", "og:description", seo.description],
    ["property", "og:url", seo.url], ["name", "twitter:title", seo.title],
    ["name", "twitter:description", seo.description],
  ];
  for (const [attribute, key, content] of tags) {
    const pattern = new RegExp(`<meta ${attribute}="${key}"[^>]*>`, "g");
    html = html.replace(pattern, "");
    html = html.replace("</head>", () => `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />\n  </head>`);
  }
  html = html.replace(/<link rel="canonical"[^>]*>/g, "");
  html = html.replace("</head>", () => `<link rel="canonical" href="${escapeHtml(seo.url)}" />\n  </head>`);
  for (const [id, schema] of [["faq-schema", seo.faqSchema], ["service-schema", seo.serviceSchema]] as const) {
    if (!schema) continue;
    const json = JSON.stringify(schema).replace(/</g, "\\u003c");
    html = html.replace("</head>", () => `<script id="${id}" type="application/ld+json">${json}</script>\n  </head>`);
  }
  return html;
}
