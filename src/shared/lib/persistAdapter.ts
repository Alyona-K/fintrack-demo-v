import { PersistStorage } from "zustand/middleware";

export const localStorageAdapter = <T>(): PersistStorage<T> => ({
  getItem: (name) => {
    const stored = localStorage.getItem(name);
    return stored ? JSON.parse(stored) : null;
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
});
