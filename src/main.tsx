import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { GoalsProvider } from "./contexts/GoalsContext";

import "./styles/globals.css";
import "./styles/theme-dark.css";
import "./styles/theme-ligth.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoalsProvider>
      <App />
    </GoalsProvider>
  </StrictMode>,
);
