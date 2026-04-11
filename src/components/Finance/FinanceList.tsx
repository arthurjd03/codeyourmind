import styles from "./styles.module.css";
import { ConfirmModal } from "../ConfirmModal";
import { useState } from "react";
import type { TransactionModel } from "../../models/TransactionModel";
import { formatCurrencyBR } from "../../utils/formatCurrency";

type Props = {
  transacoes: TransactionModel[];
  onRemove: (id: number) => void;
};
export function FinanceList({ transacoes, onRemove }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const [openList, setOpenList] = useState(false);

  function handleConfirm() {
    if (selectedId !== null) {
      onRemove(selectedId);
    }
    setOpen(false);
    setSelectedId(null);
  }

  function handleCancel() {
    setOpen(false);
    setSelectedId(null);
  }

  return (
    <>
      <div className={styles.boxHeader} onClick={() => setOpenList(!openList)}>
        <span className={`${styles.arrow} ${openList ? styles.arrowOpen : ""}`}>
          ▶
        </span>

        <h3>Transações</h3>
      </div>
      {openList && (
        <ul className={styles.remove}>
          {transacoes.map((t) => (
            <li key={t.id}>
              {t.data} - {t.desc}: {formatCurrencyBR(t.valor)}
              <button
                onClick={() => {
                  setSelectedId(t.id);
                  setOpen(true);
                }}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
      {open && (
        <ConfirmModal
          message="Tem certeza que deseja excluir esta transação?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
}
