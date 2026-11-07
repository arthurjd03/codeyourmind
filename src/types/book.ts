export type BookStatus = "reading" | "completed" | "want-to-read";

export type Book = {
  id: number;
  title: string;
  author: string;
  coverUrl?: string;
  totalPages: number;
  currentPage: number;
  status: BookStatus;
  category: string;
  rating?: number;
  notes?: string[];
  review?: string;
  finishedAt?: string; // "YYYY-MM-DD"
};

export type ReadingSession = {
  id: number;
  bookId: number;
  date: string; // "YYYY-MM-DD" no fuso local
  pagesRead: number;
};
