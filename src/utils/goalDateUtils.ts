const DAY_IN_MS = 1000 * 60 * 60 * 24;

export function getTotalDays(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diff = end.getTime() - start.getTime();

  return Math.ceil(diff / DAY_IN_MS) + 1;
}

export function getRemainingDays(endDate: string) {
  const today = new Date();
  const end = new Date(endDate);

  const diff = end.getTime() - today.getTime();

  const days = Math.ceil(diff / DAY_IN_MS);

  return days > 0 ? days : 0;
}
