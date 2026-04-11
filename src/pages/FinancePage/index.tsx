import styles from "./styles.module.css";
import { useFinance } from "../../hooks/useFinance";
import { FinanceForm } from "../../components/Finance/FinanceForm";
import { FinanceList } from "../../components/Finance/FinanceList";
import { FinanceSummary } from "../../components/Finance/FinanceSummary";
import { MainTemplate } from "../../templates/MainTemplate";
import { Border } from "../../components/Border";
import { BackButton } from "../../components/BackButton";

export function FinancePage() {
  const { transacoes, adicionar, remover, entrada, saida, saldo } =
    useFinance();

  return (
    <MainTemplate>
      <div className={styles.container}>
        <Border>
          <div className={styles.header}>
            <h1>Controle Financeiro</h1>
            <p>Acompanhe suas entradas, saídas e saldo em tempo real.</p>
          </div>
        </Border>
        <section className={styles.arrow}>
          <BackButton />
        </section>
        <FinanceSummary entrada={entrada} saida={saida} saldo={saldo} />

        <FinanceForm onAdd={adicionar} />

        <FinanceList transacoes={transacoes} onRemove={remover} />
      </div>
    </MainTemplate>
  );
}
