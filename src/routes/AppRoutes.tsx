import { BrowserRouter, Route, Routes, Navigate } from "react-router";

import { Home } from "../pages/Home";
import Mission from "../pages/Mission";
import ConfigPage from "../pages/Settings";
import { CreateGoal } from "../pages/CreateGoal";
import HabitsPage from "../pages/Habits";
import { ProgressPage } from "../pages/Progress";
import { FinancePage } from "../pages/FinancePage";
import { NotFound } from "../pages/NotFound";

export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />

        <Route path="/home" element={<Home />} />

        <Route path="/mission" element={<Mission />} />

        <Route path="/settings" element={<ConfigPage />} />

        <Route path="/creategoal" element={<CreateGoal />} />

        <Route path="/habits" element={<HabitsPage />} />

        <Route path="/progress" element={<ProgressPage />} />

        <Route path="/finance" element={<FinancePage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
