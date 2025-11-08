import { Transaction } from "./transaction.types";
import { demoTransactions } from "@/data/mock/demoTransactions";
import { useUserStore } from "@/entities/user/model/user.store";

const STORAGE_KEY = "demoTransactions";

// Загружаем транзакции из localStorage или берем моки
const loadTransactions = (): Transaction[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [...demoTransactions];
};

// Сохраняем транзакции в localStorage
const saveTransactions = (transactions: Transaction[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};

export const transactionApi = {
  async getTransactions(): Promise<Transaction[]> {
    const txs = loadTransactions();
    return new Promise(resolve => setTimeout(() => resolve(txs), 200));
  },

  async createTransaction(tx: Omit<Transaction, "id">): Promise<Transaction> {
    const { user } = useUserStore.getState();
    if (!user) throw new Error("User not logged in");

    const transactions = loadTransactions();
    const newTx: Transaction = { ...tx, id: `txn-${Date.now()}`, userId: user.id };
    transactions.push(newTx);
    saveTransactions(transactions);

    return new Promise(resolve => setTimeout(() => resolve(newTx), 200));
  },

  async updateTransaction(tx: Transaction): Promise<Transaction> {
    if (!tx.id) throw new Error("Transaction ID is required");

    const transactions = loadTransactions();
    const idx = transactions.findIndex(t => t.id === tx.id);
    if (idx === -1) throw new Error("Transaction not found");

    transactions[idx] = { ...transactions[idx], ...tx };
    saveTransactions(transactions);

    return new Promise(resolve => setTimeout(() => resolve(transactions[idx]), 200));
  },

  async deleteTransaction(id: string): Promise<Transaction> {
    const transactions = loadTransactions();
    const idx = transactions.findIndex(t => t.id === id);
    if (idx === -1) throw new Error("Transaction not found");

    const [deleted] = transactions.splice(idx, 1);
    saveTransactions(transactions);

    return new Promise(resolve => setTimeout(() => resolve(deleted), 200));
  },
};


//-----------

// import { Transaction } from "./transaction.types";
// import { demoTransactions } from "@/data/mock/demoTransactions";
// import { useUserStore } from "@/entities/user/model/user.store";

// export const transactionApi = {
//   async getTransactions(): Promise<Transaction[]> {
//     return new Promise(resolve => setTimeout(() => resolve(demoTransactions), 200));
//   },

//   async createTransaction(tx: Omit<Transaction, "id">): Promise<Transaction> {
//     const { user } = useUserStore.getState();
//     if (!user) throw new Error("User not logged in");

//     const newTx: Transaction = { ...tx, id: `txn-${Date.now()}`, userId: user.id };
//     demoTransactions.push(newTx);

//     return new Promise(resolve => setTimeout(() => resolve(newTx), 200));
//   },

//   async updateTransaction(tx: Transaction): Promise<Transaction> {
//     if (!tx.id) throw new Error("Transaction ID is required");
//     const idx = demoTransactions.findIndex(t => t.id === tx.id);
//     if (idx === -1) throw new Error("Transaction not found");

//     demoTransactions[idx] = { ...demoTransactions[idx], ...tx };
//     return new Promise(resolve => setTimeout(() => resolve(demoTransactions[idx]), 200));
//   },

//   async deleteTransaction(id: string): Promise<Transaction> {
//     const idx = demoTransactions.findIndex(t => t.id === id);
//     if (idx === -1) throw new Error("Transaction not found");

//     const [deleted] = demoTransactions.splice(idx, 1);
//     return new Promise(resolve => setTimeout(() => resolve(deleted), 200));
//   },
// };

//----------------------


// import { api } from "@/shared/lib/api";
// import { Transaction } from "./transaction.types";
// import { useUserStore } from "@/entities/user/model/user.store";

// export const getTransactions = async (): Promise<Transaction[]> => {
//   const { data } = await api.get<Transaction[]>("/transactions");
//   return data;
// };

// export const createTransaction = async (
//   tx: Omit<Transaction, "id">
// ): Promise<Transaction> => {
//   const { user } = useUserStore.getState();
//   if (!user) throw new Error("User not logged in");

//   const { data } = await api.post<Transaction>("/transactions", {
//     ...tx,
//     userId: user.id,
//   });
//   return data;
// };

// export const updateTransactionApi = async (
//   tx: Transaction
// ): Promise<Transaction> => {
//   if (!tx.id) throw new Error("Transaction ID is required");

//   const { data } = await api.patch<Transaction>(`/transactions/${tx.id}`, tx);
//   return data;
// };

// export const deleteTransactionApi = async (
//   id: string
// ): Promise<Transaction> => {
//   const { data } = await api.delete<Transaction>(`/transactions/${id}`);
//   return data;
// };
