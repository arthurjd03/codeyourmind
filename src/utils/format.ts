export function formatCurrencyBR(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}
