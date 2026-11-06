import styles from "./styles.module.css";
import { formatCurrencyBR } from "../../utils/format";

type Props = {
  entrada: number;
  saida: number;
  saldo: number;
};

export function FinanceSummary({ entrada, saida, saldo }: Props) {
  return (
    <div className={styles.container}>
      <p className={styles.income}>Entrada: {formatCurrencyBR(entrada)}</p>
      <p className={styles.expense}>Saída: {formatCurrencyBR(Math.abs(saida))}</p>
      <p className={styles.balance}>Saldo: {formatCurrencyBR(saldo)}</p>
    </div>
  );
}
