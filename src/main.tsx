import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { GoalsProvider } from "./contexts/GoalsContext";

import "./styles/globals.css";
import "./styles/theme.css";
import "./styles/variables.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoalsProvider>
      <App />
    </GoalsProvider>
  </StrictMode>,
);
