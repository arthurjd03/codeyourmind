import { useState } from "react";
import { Flame, Library, BookOpen, Plus } from "lucide-react";
import type { BookStatus } from "../../types/book";
import { useBooks } from "../../hooks/useBooks";
import { BookCard } from "./BookCard";
import styles from "./ReadingPage.module.css";
import { MainTemplate } from "../../templates/MainTemplate";
import { BackButton } from "../../components/BackButton";
import { AddBookForm } from "../../components/AddBookForm";

const TABS: { value: BookStatus; label: string }[] = [
  { value: "reading", label: "Lendo" },
  { value: "want-to-read", label: "Quero ler" },
  { value: "completed", label: "Estante concluída" },
];

export function ReadingPage() {
  const { books, stats, addBook ,logSession, removeBook } = useBooks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<BookStatus>("reading");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", ...new Set(books.map((book) => book.category))];

  const visibleBooks = books.filter(
    (book) =>
      book.status === activeTab &&
      (activeCategory === "all" || book.category === activeCategory),
  );

  return (
    <MainTemplate>
      <BackButton />
      <div className={styles.page}>
        <header className={styles.header}>
          <h1>Minha leitura</h1>
          <p>
            Registre suas páginas, mantenha a ofensiva e construa sua estante.
          </p>
        </header>
        <button type="button" className={styles.addButton} onClick={() => setIsFormOpen(true)}>
          <Plus size={18} aria-hidden="true" />
          Adicionar livro
        </button>

        {isFormOpen && (
          <AddBookForm 
          onSubmit={(data, satus) => {
            addBook(data, satus);
            setIsFormOpen(false);
          }}
          onClose={() => setIsFormOpen(false)}
          />
        )}
      
        <div className={styles.summary}>
          <div className={styles.summaryItem}>
            <Flame size={20} aria-hidden="true" />
            <strong>{stats.streak}</strong>
            <span>Dias seguidos</span>
          </div>
          <div className={styles.summaryItem}>
            <BookOpen size={20} aria-hidden="true" />
            <strong>{stats.pagesToday}</strong>
            <span>Páginas hoje</span>
          </div>
          <div className={styles.summaryItem}>
            <Library size={20} aria-hidden="true" />
            <strong>{stats.completed}</strong>
            <span>Concluídos</span>
          </div>
        </div>

        <div className={styles.tabs} role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.value}
              className={styles.tab}
              data-active={activeTab === tab.value}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {categories.length > 2 && (
          <div className={styles.filters}>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={styles.chip}
                data-active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category === "all" ? "Todas" : category}
              </button>
            ))}
          </div>
        )}

        {visibleBooks.length === 0 ? (
          <p className={styles.empty}>Nenhum livro aqui ainda.</p>
        ) : (
          <div className={styles.list}>
            {visibleBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onLogSession={logSession}
                onRemove={removeBook}
              />
            ))}
          </div>
        )}
      </div>
    </MainTemplate>
  );
}
