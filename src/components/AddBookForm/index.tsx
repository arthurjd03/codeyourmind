import { useEffect, useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import type { Book, BookStatus } from "../../types/book";
import { fileToCompressedDataUrl } from "../../utils/image";
import styles from "./styles.module.css";

type NewBook = Pick<
  Book,
  "title" | "author" | "totalPages" | "category" | "coverUrl"
>;

type AddBookFormProps = {
  onSubmit: (data: NewBook, status: BookStatus) => void;
  onClose: () => void;
};

export function AddBookForm({ onSubmit, onClose }: AddBookFormProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<BookStatus>("want-to-read");
  const [coverUrl, setCoverUrl] = useState<string | undefined>();
  const [error, setError] = useState("");

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setCoverUrl(await fileToCompressedDataUrl(file));
      setError("");
    } catch {
      setError("Não foi possível carregar a imagem.");
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const pages = Number(totalPages);

    if (!title.trim() || !author.trim()) {
      setError("Preencha título e autor.");
      return;
    }

    if (!Number.isInteger(pages) || pages <= 0) {
      setError("Informe um total de páginas válido.");
      return;
    }

    onSubmit(
      {
        title: title.trim(),
        author: author.trim(),
        totalPages: pages,
        category: category.trim() || "Geral",
        coverUrl,
      },
      status,
    );
  };

  return (
    <dialog ref={dialogRef} className={styles.dialog} onClose={onClose}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <header className={styles.header}>
          <h2 className={styles.heading}>Novo livro</h2>
          <button
            type="button"
            className={styles.close}
            aria-label="Fechar"
            onClick={onClose}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        {/* Capa: upload OU link */}
        <div className={styles.content}>
          <div
            className={styles.coverPicker}
            style={
              coverUrl
                ? ({
                    "--cover": `url(${JSON.stringify(coverUrl)})`,
                  } as React.CSSProperties)
                : undefined
            }
          >
            {coverUrl ? (
              <img
                className={styles.coverPreview}
                src={coverUrl}
                alt="Prévia da capa"
              />
            ) : (
              <div className={styles.coverPreview} aria-hidden="true">
                <ImagePlus size={28} />
              </div>
            )}

            <div className={styles.coverActions}>
              <label className={styles.fileButton}>
                Enviar imagem
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFile}
                />
              </label>

              <input
                type="url"
                placeholder="ou cole o link da capa"
                aria-label="Link da capa"
                value={coverUrl?.startsWith("data:") ? "" : (coverUrl ?? "")}
                onChange={(event) =>
                  setCoverUrl(event.target.value || undefined)
                }
              />
            </div>
          </div>

          <div className={styles.fields}>
            <label className={styles.field}>
              Título
              <input
                value={title}
                placeholder="Ex: O poder do pensamento"
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </label>

            <label className={styles.field}>
              Autor
              <input
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                placeholder="Ex: Robert C. Martin"
                required
              />
            </label>

            <label className={styles.field}>
              Total de páginas
              <input
                type="number"
                min="1"
                value={totalPages}
                onChange={(event) => setTotalPages(event.target.value)}
                placeholder="Ex: 425"
                required
              />
            </label>

            <label className={styles.field}>
              Categoria
              <input
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="Ex: Aventura"
                required
              />
            </label>

            <label className={styles.field}>
              Status inicial
              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as BookStatus)
                }
              >
                <option value="want-to-read">Quero ler</option>
                <option value="reading">Lendo agora</option>
                <option value="completed">Concluído</option>
              </select>
            </label>
            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancel} onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className={styles.submit}>
            Salvar livro
          </button>
        </div>
      </form>
    </dialog>
  );
}
