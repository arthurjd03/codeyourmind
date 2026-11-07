import { useState } from "react";
import { BookOpen, Trash2 } from "lucide-react";
import type { Book } from "../../types/book";
import { getProgressPercent } from "../../utils/books";
import styles from "./BookCard.module.css";

type BookCardProps = {
  book: Book;
  onLogSession: (id: number, pages: number) => void;
  onRemove: (id: number) => void;
};

export function BookCard({ book, onLogSession, onRemove }: BookCardProps) {
  const [pages, setPages] = useState("");
  const percent = getProgressPercent(book);
  const isCompleted = book.status === "completed";

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const value = Number(pages);
    if (!Number.isInteger(value) || value <= 0) return;
    onLogSession(book.id, value);
    setPages("");
  };

  return (
    <article className={styles.card}>
      {book.coverUrl ? (
        <img
          className={styles.cover}
          src={book.coverUrl}
          alt={`Capa de ${book.title}`}
          loading="lazy"
        />
      ) : (
        <div
          className={`${styles.cover} ${styles.coverFallback}`}
          aria-hidden="true"
        >
          <BookOpen size={28} />
        </div>
      )}

      <div className={styles.body}>
        <header className={styles.header}>
          <span className={styles.badge}>{book.category}</span>
          <h3 className={styles.title}>{book.title}</h3>
          <p className={styles.author}>{book.author}</p>
        </header>

        <div className={styles.progress}>
          <div className={styles.progressInfo}>
            <span>
              {book.currentPage} / {book.totalPages} páginas
            </span>
            <strong>{percent}%</strong>
          </div>
          <div
            className={styles.track}
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className={styles.fill} style={{ width: `${percent}%` }} />
          </div>
        </div>

        <div className={styles.footer}>
          {!isCompleted && (
            <form className={styles.sessionForm} onSubmit={handleSubmit}>
              <input
                type="number"
                min={1}
                inputMode="numeric"
                placeholder="Li hoje..."
                aria-label="Páginas lidas hoje"
                value={pages}
                onChange={(event) => setPages(event.target.value)}
              />
              <button type="submit">Registrar</button>
            </form>
          )}

          <button
            type="button"
            className={styles.remove}
            aria-label={`Remover ${book.title}`}
            onClick={() => onRemove(book.id)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
