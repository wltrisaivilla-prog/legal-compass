import { BrowserRouter } from "react-router-dom";
import AppContent from "./AppContent";

export default function App({ buildYear }: { buildYear?: number }) {
  return <BrowserRouter><AppContent buildYear={buildYear} /></BrowserRouter>;
}
