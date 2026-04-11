import type { TransactionModel } from "../models/TransactionModel";

const STORAGE_KEY = "@codeyourmind:transactions";

export function getTransactions(): TransactionModel[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveTransactions(transactions: TransactionModel[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}
