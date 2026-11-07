import type { Book, ReadingSession } from "../types/book";

export function getProgressPercent(book: Book): number {
  if (book.totalPages <= 0) return 0;
  return Math.min(100, Math.round((book.currentPage / book.totalPages) * 100));
}

export function getDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function shiftDay(dateKey: string, offset: number): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  return getDateKey(new Date(year, month - 1, day + offset));
}

export function getPagesReadToday(sessions: ReadingSession[]): number {
  const today = getDateKey();
  return sessions
    .filter((session) => session.date === today)
    .reduce((total, session) => total + session.pagesRead, 0);
}

export function calculateStreak(sessions: ReadingSession[]): number {
  const readDays = new Set(sessions.map((session) => session.date));
  const today = getDateKey();

  // Se ainda não leu hoje, a ofensiva continua valendo a partir de ontem
  let cursor = readDays.has(today) ? today : shiftDay(today, -1);
  let streak = 0;

  while (readDays.has(cursor)) {
    streak++;
    cursor = shiftDay(cursor, 1 );
  }

  return streak;
}
