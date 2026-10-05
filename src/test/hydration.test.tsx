import { getRouteMetadata } from "@/seo/metadata";
import { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { fireEvent, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "@/App";
import { render } from "@/entry-server";
import { renderMetadata } from "@/seo/metadata";
import { routeSeo } from "@/seo/routes";
import { readFileSync } from "node:fs";

vi.mock("@paypal/react-paypal-js", () => ({
  PayPalScriptProvider: ({ children }: { children: React.ReactNode }) => children,
  PayPalButtons: () => <button>PayPal de prueba</button>,
}));

const template = readFileSync("index.html", "utf8");
const observer = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
vi.stubGlobal("IntersectionObserver", observer);
vi.stubGlobal("ResizeObserver", observer);
window.scrollTo = vi.fn();
afterEach(() => { document.body.innerHTML = ""; document.head.innerHTML = ""; vi.restoreAllMocks(); });

describe("hydration and client interactions", () => {
  for (const path of Object.keys(routeSeo)) {
    it(`hydrates ${path} without recovering or duplicating SEO`, async () => {
      window.history.replaceState({}, "", path);
      // Suppress server-side useLayoutEffect notices from dependencies in jsdom.
      const errors = vi.spyOn(console, "error").mockImplementation(() => {});
      const markup = render(path, 1999);
      document.head.innerHTML = renderMetadata(template, path).match(/<head>([\s\S]*?)<\/head>/)![1];
      const container = document.createElement("div");
      container.innerHTML = markup;
      document.body.append(container);
      errors.mockClear();
      const recoveries = vi.fn();
      let root: ReturnType<typeof hydrateRoot>;
      await act(async () => { root = hydrateRoot(container, <App buildYear={1999} />, { onRecoverableError: recoveries }); });
      expect(recoveries).not.toHaveBeenCalled();
      expect(errors).not.toHaveBeenCalled();
      expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
      expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(1);
      expect(document.querySelectorAll("#business-schema")).toHaveLength(1);
      expect(document.querySelectorAll("#faq-schema")).toHaveLength(getRouteMetadata(path).faqSchema ? 1 : 0);
      expect(document.querySelectorAll("#service-schema")).toHaveLength(getRouteMetadata(path).serviceSchema ? 1 : 0);
      expect(container.querySelector("footer")?.textContent).not.toContain("1999");

      if (path === "/servicios") {
        await act(async () => { fireEvent.change(within(container).getByRole("searchbox"), { target: { value: "Despidos" } }); });
        expect(within(container).getByRole("link", { name: "Consultar por WhatsApp sobre Despidos injustificados" })).toHaveAttribute("data-intent", "service_inquiry");
      }
      if (path === "/faq") {
        await act(async () => { fireEvent.click(within(container).getByRole("button", { name: "¿Cuánto cuesta una consulta inicial?" })); });
        expect(within(container).getByRole("region", { name: "¿Cuánto cuesta una consulta inicial?" })).toHaveTextContent("La primera consulta es gratuita");
      }
      if (path === "/documentos") {
        await act(async () => { fireEvent.click(within(container).getAllByRole("button", { name: "Comprar" })[0]); });
        expect(within(container).getByRole("button", { name: "PayPal de prueba" })).toBeInTheDocument();
      }
      await act(async () => { root!.unmount(); });
    });
  }
});
