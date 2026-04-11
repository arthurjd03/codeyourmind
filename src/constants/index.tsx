import type { GoalCategory } from "../models/GoalModel";
export const GOAL_CATEGORIES: GoalCategory[] = [
  "pessoal",
  "profissional",
  "estudos",
];

export const CATEGORY_COLORS: Record<GoalCategory, string> = {
  pessoal: "#3b82f6",
  profissional: "#22c55e",
  estudos: "#eab308",
};
