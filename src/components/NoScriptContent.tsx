import { escapeHtml } from "@/seo/metadata";

// Keep collapsed answers/catalogue accessible when JavaScript is disabled.
// Raw noscript markup also avoids HTML-parser differences during hydration.
export default function NoScriptContent({ sections }: {
  sections: { title: string; paragraphs: string[] }[];
}) {
  const html = sections.map(section => `<section class="mb-6"><h2 class="font-heading text-xl font-bold mb-3">${escapeHtml(section.title)}</h2>${section.paragraphs.map(text => `<p class="mb-2">${escapeHtml(text)}</p>`).join("")}</section>`).join("");
  return <noscript dangerouslySetInnerHTML={{ __html: `<div class="container mx-auto section-padding">${html}</div>` }} />;
}
