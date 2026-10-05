import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { applyRouteSeo } from "./head";

export default function RouteSeo() {
  const { pathname } = useLocation();
  useEffect(() => { applyRouteSeo(pathname); }, [pathname]);
  return null;
}
