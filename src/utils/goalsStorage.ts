import type { GoalModel } from "../models/GoalModel";

const STORAGE_KEY = "@codeyourmind:goals";

export function getGoals(): GoalModel[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveGoal(goal: GoalModel) {
  const goals = getGoals();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...goals, goal]));
}
