import { PersistStorage } from "zustand/middleware";

export const localStorageAdapter = <T>(): PersistStorage<T> => ({
  getItem: (name) => {
    try {
      const stored = localStorage.getItem(name);
      return stored ? JSON.parse(stored) : null;
    } catch (err) {
      console.error(`[localStorage] Failed to get ${name}:`, err);
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      localStorage.setItem(name, JSON.stringify(value));
    } catch (err) {
      console.error(`[localStorage] Failed to set ${name}:`, err);
    }
  },
  removeItem: (name) => {
    try {
      localStorage.removeItem(name);
    } catch (err) {
      console.error(`[localStorage] Failed to remove ${name}:`, err);
    }
  },
});
