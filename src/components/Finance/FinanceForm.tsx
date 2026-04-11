import styles from "./styles.module.css";
import { useState } from "react";
import type { TransactionModel } from "../../models/TransactionModel";
import { toastifyAdapter } from "../../adapters/toastifyAdapter";

type Props = {
  onAdd: (t: TransactionModel) => void;
};

export function FinanceForm({ onAdd }: Props) {
  const [desc, setDesc] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState(new Date().toISOString().split("T")[0]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const valorNumber = parseFloat(valor.replace(/\./g, "").replace(",", "."));

    if (!desc || isNaN(valorNumber) || !data) {
      toastifyAdapter.error("Preencha todos os campos!");
      return;
    }
    if (valorNumber === 0) {
      toastifyAdapter.warning("Informe um valor válido diferente de zero!");
      return;
    }
    onAdd({
      id: Date.now(),
      desc,
      valor: valorNumber,
      data,
    });

    toastifyAdapter.success("Transação adicionada com sucesso!");

    setDesc("");
    setValor("");
    setData("");
  }

  function formatarValorInput(valor: string) {
    const isNegativo = valor.startsWith("-");

    let numbers = valor.replace(/\D/g, "");

    if (!numbers) return isNegativo ? "-" : "";

    const number = (parseInt(numbers, 10) / 100).toFixed(2);

    const formatado = Number(number).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return isNegativo ? `-${formatado}` : formatado;
  }

  function handleValorChange(e: React.ChangeEvent<HTMLInputElement>) {
    const valorFormatado = formatarValorInput(e.target.value);
    setValor(valorFormatado);
  }
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        placeholder="Descrição:"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <input placeholder="Valor:" value={valor} onChange={handleValorChange} />

      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <button type="submit">Adicionar</button>
    </form>
  );
}
