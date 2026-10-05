import { createContext, useContext } from "react";

export const HydrationContext = createContext(false);
export const useHydrated = () => useContext(HydrationContext);

export const SiteYearContext = createContext(0);
export const useSiteYear = () => useContext(SiteYearContext);
export const getSiteYear = () => Number(new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Guatemala", year: "numeric",
}).format(new Date()));
