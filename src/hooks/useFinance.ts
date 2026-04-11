import { useEffect, useState } from "react";
import type { TransactionModel } from "../models/TransactionModel";
import { getTransactions, saveTransactions } from "../utils/financeStorage";

export function useFinance() {
  const [transacoes, setTransacoes] =
    useState<TransactionModel[]>(getTransactions());

  useEffect(() => {
    saveTransactions(transacoes);
  }, [transacoes]);

  function adicionar(transacao: TransactionModel) {
    setTransacoes((prev) => [...prev, transacao]);
  }

  function remover(id: number) {
    setTransacoes((prev) => prev.filter((t) => t.id !== id));
  }

  const entrada = transacoes
    .filter((t) => t.valor > 0)
    .reduce((acc, t) => acc + t.valor, 0);

  const saida = transacoes
    .filter((t) => t.valor < 0)
    .reduce((acc, t) => acc + t.valor, 0);

  const saldo = entrada + saida;

  return {
    transacoes,
    adicionar,
    remover,
    entrada,
    saida,
    saldo,
  };
}
