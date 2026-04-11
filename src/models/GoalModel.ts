export type GoalCategory = "pessoal" | "profissional" | "estudos";

export type GoalModel = {
  id: string;
  title: string;
  category: GoalCategory;

  progress: number;

  createdAt: string;

  daysCompleted?: number;

  startDate?: string;
  endDate?: string;
};
