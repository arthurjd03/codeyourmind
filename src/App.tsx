import { ToastProvider } from "./components/ToastProvider";

import { MainRouter } from "./routes/AppRoutes";

export function App() {
  return (
    <ToastProvider>
      <MainRouter />
    </ToastProvider>
  );
}
