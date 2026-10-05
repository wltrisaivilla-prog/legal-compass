import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";
import AppContent from "./AppContent";
import { getSiteYear } from "./hooks/use-hydrated";
export { getSiteYear } from "./hooks/use-hydrated";
export { routeSeo, SITE_URL } from "./seo/routes";
export { renderMetadata } from "./seo/metadata";

export function render(pathname: string, buildYear = getSiteYear()) {
  return renderToString(<StaticRouter location={pathname}><AppContent buildYear={buildYear} /></StaticRouter>);
}

export { getRouteMetadata } from "./seo/metadata";
