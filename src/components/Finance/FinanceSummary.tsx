import styles from "./styles.module.css";
import { formatCurrencyBR } from "../../utils/formatCurrency";

type Props = {
  entrada: number;
  saida: number;
  saldo: number;
};

export function FinanceSummary({ entrada, saida, saldo }: Props) {
  return (
    <div className={styles.container}>
      <p>Entrada: {formatCurrencyBR(entrada)}</p>
      <p>Saída: {formatCurrencyBR(Math.abs(saida))}</p>
      <p>Saldo: {formatCurrencyBR(saldo)}</p>
    </div>
  );
}
