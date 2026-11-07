import { useEffect, useMemo, useState } from "react";
import type { Book, BookStatus, ReadingSession } from "../types/book";
import { STORAGE_KEYS, getStorageItem, setStorageItem } from "../utils/bookStorage";
import { calculateStreak, getDateKey, getPagesReadToday } from "../utils/books";

type NewBook = Pick<
  Book,
  "title" | "author" | "totalPages" | "category" | "coverUrl"
>;

export function useBooks() {
  const [books, setBooks] = useState<Book[]>(() =>
    getStorageItem<Book[]>(STORAGE_KEYS.books, []),
  );
  const [sessions, setSessions] = useState<ReadingSession[]>(() =>
    getStorageItem<ReadingSession[]>(STORAGE_KEYS.sessions, []),
  );

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.books, books);
  }, [books]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.sessions, sessions);
  }, [sessions]);

  const addBook = (data: NewBook, status: BookStatus = "want-to-read") => {
    const book: Book = {
      ...data,
      id: Date.now(),
      currentPage: 0,
      status,
      notes: [],
    };
    setBooks((prev) => [book, ...prev]);
  };

  // O histórico de sessões é mantido mesmo se o livro for removido
  const removeBook = (id: number) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const logSession = (bookId: number, pagesRead: number) => {
    if (pagesRead <= 0) return;

    setBooks((prev) =>
      prev.map((book) => {
        if (book.id !== bookId) return book;

        const currentPage = Math.min(book.currentPage + pagesRead, book.totalPages);
        const isFinished = currentPage >= book.totalPages;

        return {
          ...book,
          currentPage,
          status: isFinished ? "completed" : "reading",
          finishedAt: isFinished ? getDateKey() : book.finishedAt,
        };
      }),
    );

    setSessions((prev) => [
      ...prev,
      { id: Date.now(), bookId, date: getDateKey(), pagesRead },
    ]);
  };

  const updateStatus = (id: number, status: BookStatus) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? { ...book, status } : book)),
    );
  };

  const addNote = (id: number, note: string) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id
          ? { ...book, notes: [...(book.notes ?? []), note] }
          : book,
      ),
    );
  };

  const saveReview = (id: number, rating: number, review: string) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? { ...book, rating, review } : book)),
    );
  };

  const stats = useMemo(
    () => ({
      streak: calculateStreak(sessions),
      pagesToday: getPagesReadToday(sessions),
      completed: books.filter((book) => book.status === "completed").length,
    }),
    [books, sessions],
  );

  return {
    books,
    stats,
    addBook,
    removeBook,
    logSession,
    updateStatus,
    addNote,
    saveReview,
  };
}
