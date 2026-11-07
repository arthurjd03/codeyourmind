export const STORAGE_KEYS = {
  books: "cym:books",
  sessions: "cym:reading-sessions",
} as const;

export function getStorageItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Falha ao salvar "${key}" para o localStorage`, error);
  }
}

export function removeStorageItem(key: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(key);
}
