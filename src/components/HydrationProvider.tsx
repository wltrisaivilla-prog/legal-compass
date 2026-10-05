import { useEffect, useState, type ReactNode } from "react";
import { HydrationContext, SiteYearContext, getSiteYear } from "@/hooks/use-hydrated";

export function HydrationProvider({ children, buildYear }: { children: ReactNode; buildYear?: number }) {
  const [hydrated, setHydrated] = useState(false);
  const [year, setYear] = useState(buildYear ?? getSiteYear());
  useEffect(() => { setHydrated(true); setYear(getSiteYear()); }, []);
  return <HydrationContext.Provider value={hydrated}>
    <SiteYearContext.Provider value={year}>{children}</SiteYearContext.Provider>
  </HydrationContext.Provider>;
}
