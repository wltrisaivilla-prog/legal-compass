import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("root")!;
if (root.dataset.prerendered === "true") {
  hydrateRoot(root, <App buildYear={Number(root.dataset.buildYear)} />);
} else {
  createRoot(root).render(<App />);
}
