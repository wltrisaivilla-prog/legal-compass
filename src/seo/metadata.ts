import { faqs } from "./faqs";
import { routeSeo, SITE_URL } from "./routes";

export function getRouteMetadata(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  return {
    path,
    url: `${SITE_URL}${path}`,
    ...(routeSeo[path] ?? {
      title: "Página no encontrada | Litigios de Guatemala",
      description: "La página solicitada no está disponible. Consulte los servicios y la información de contacto de Litigios de Guatemala.",
    }),
    robots: routeSeo[path] ? "index, follow, max-snippet:-1, max-image-preview:large" : "noindex, follow",
    faqSchema: path === "/faq" ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${SITE_URL}/faq#faq`,
      mainEntity: faqs.map(faq => ({
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
    .replace(/<script id="faq-schema"[^>]*>[\s\S]*?<\/script>/g, "")
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
  if (seo.faqSchema) {
    const json = JSON.stringify(seo.faqSchema).replace(/</g, "\\u003c");
    html = html.replace("</head>", () => `<script id="faq-schema" type="application/ld+json">${json}</script>\n  </head>`);
  }
  return html;
}
