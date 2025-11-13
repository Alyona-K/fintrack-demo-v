import { Transaction } from "./transaction.types";
import { demoTransactions } from "@/data/mock/demoTransactions";
import { useUserStore } from "@/entities/user/model/user.store";

const STORAGE_KEY = "demoTransactions";

const loadTransactions = (): Transaction[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [...demoTransactions];
};

const saveTransactions = (transactions: Transaction[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};

export const transactionApi = {
  async getTransactions(): Promise<Transaction[]> {
    const txs = loadTransactions();
    return new Promise((resolve) => setTimeout(() => resolve(txs), 200));
  },

  async createTransaction(tx: Omit<Transaction, "id">): Promise<Transaction> {
    const { user } = useUserStore.getState();
    if (!user) throw new Error("User not logged in");

    const transactions = loadTransactions();
    const newTx: Transaction = {
      ...tx,
      id: `txn-${Date.now()}`,
      userId: user.id,
    };
    transactions.push(newTx);
    saveTransactions(transactions);

    return new Promise((resolve) => setTimeout(() => resolve(newTx), 200));
  },

  async updateTransaction(tx: Transaction): Promise<Transaction> {
    if (!tx.id) throw new Error("Transaction ID is required");

    const transactions = loadTransactions();
    const idx = transactions.findIndex((t) => t.id === tx.id);
    if (idx === -1) throw new Error("Transaction not found");

    transactions[idx] = { ...transactions[idx], ...tx };
    saveTransactions(transactions);

    return new Promise((resolve) =>
      setTimeout(() => resolve(transactions[idx]), 200)
    );
  },

  async deleteTransaction(id: string): Promise<Transaction> {
    const transactions = loadTransactions();
    const idx = transactions.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error("Transaction not found");

    const [deleted] = transactions.splice(idx, 1);
    saveTransactions(transactions);

    return new Promise((resolve) => setTimeout(() => resolve(deleted), 200));
  },
};
