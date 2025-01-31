import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Analyze } from "./pages/Analyze";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Analyze />
  </StrictMode>
);
