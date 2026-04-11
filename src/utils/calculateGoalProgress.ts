export function calculateGoalProgress(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();

  const total = end.getTime() - start.getTime();
  const elapsed = today.getTime() - start.getTime();

  const progress = (elapsed / total) * 100;

  return Math.round(Math.min(Math.max(progress, 0), 100));
}
