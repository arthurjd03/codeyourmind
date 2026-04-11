import styles from "./styles.module.css";
import { createPortal } from "react-dom";

type Props = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({ message, onConfirm, onCancel }: Props) {
  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Confirmar ação</h3>

        <p>{message}</p>

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onCancel}>
            Cancelar
          </button>

          <button className={styles.confirm} onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
