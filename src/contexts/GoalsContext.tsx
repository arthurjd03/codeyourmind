import { createContext, useContext, useEffect, useState } from "react";
import type { GoalModel } from "../models/GoalModel";

type GoalsContextType = {
  goals: GoalModel[];
  addGoal: (goal: GoalModel) => void;
  removeGoal: (id: string) => void;
  updateGoal: (goal: GoalModel) => void;
};

const GoalsContext = createContext({} as GoalsContextType);

export function GoalsProvider({ children }: { children: React.ReactNode }) {
  const [goals, setGoals] = useState<GoalModel[]>(() => {
    const stored = localStorage.getItem("goals");

    if (!stored) return [];

    return JSON.parse(stored);
  });

  // salvar no localStorage
  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  function addGoal(goal: GoalModel) {
    setGoals((prev) => [...prev, goal]);
  }

  function removeGoal(id: string) {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  }

  function updateGoal(updatedGoal: GoalModel) {
    setGoals((prev) =>
      prev.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)),
    );
  }
  return (
    <GoalsContext.Provider value={{ goals, addGoal, removeGoal, updateGoal }}>
      {children}
    </GoalsContext.Provider>
  );
}

export function useGoals() {
  return useContext(GoalsContext);
}
