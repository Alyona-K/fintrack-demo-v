jest.mock("@/entities/user/model/user.store");

import { transactionApi } from "./transaction.api";
import { useUserStore } from "@/entities/user/model/user.store";
import { demoTransactions } from "@/data/mock/demoTransactions";
import type { Transaction } from "./transaction.types";

const mockedUserStore = useUserStore as jest.Mocked<any>;

describe("transactionApi (demo)", () => {
  const user = { id: 1, email: "demo@test.com" };

  const txBase: Omit<Transaction, "id"> = {
    amount: 50,
    categoryId: "2",
    date: "2025-10-20",
    description: "Transport",
    type: "Expenses",
    userId: user.id,
  };

  beforeEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
    mockedUserStore.getState.mockReturnValue({ user });

    demoTransactions.length = 0;
    demoTransactions.push({
      id: "txn-1",
      amount: 100,
      categoryId: "1",
      date: "2025-10-12",
      description: "Groceries",
      type: "Expenses",
      userId: user.id,
    });
  });

  // --- GET ---
  it("getTransactions returns list from demoTransactions if localStorage empty", async () => {
    const result = await transactionApi.getTransactions();
    expect(result).toEqual(demoTransactions);
  });

  it("getTransactions loads from localStorage if present", async () => {
    const stored = [
      { ...demoTransactions[0], id: "txn-999", description: "Stored TX" },
    ];
    localStorage.setItem("demoTransactions", JSON.stringify(stored));
    const result = await transactionApi.getTransactions();
    expect(result).toEqual(stored);
  });

  // --- CREATE ---
  it("createTransaction adds new transaction and saves to localStorage", async () => {
    const result = await transactionApi.createTransaction(txBase);
    const stored = JSON.parse(localStorage.getItem("demoTransactions")!);

    expect(result).toMatchObject(txBase);
    expect(result).toHaveProperty("id");
    expect(stored.find((t: any) => t.id === result.id)).toBeTruthy();
  });

  it("createTransaction throws if user not logged in", async () => {
    mockedUserStore.getState.mockReturnValue({ user: null });
    await expect(transactionApi.createTransaction(txBase)).rejects.toThrow(
      "User not logged in"
    );
  });

  // --- UPDATE ---
  it("updateTransaction modifies existing transaction", async () => {
    const existing = demoTransactions[0];
    localStorage.setItem("demoTransactions", JSON.stringify([existing]));

    const updated = { ...existing, description: "Updated" };
    const result = await transactionApi.updateTransaction(updated);

    expect(result.description).toBe("Updated");
    const stored = JSON.parse(localStorage.getItem("demoTransactions")!);
    expect(stored[0].description).toBe("Updated");
  });

  it("updateTransaction throws if not found", async () => {
    await expect(
      transactionApi.updateTransaction({ ...txBase, id: "fake-id" })
    ).rejects.toThrow("Transaction not found");
  });

  // --- DELETE ---
  it("deleteTransaction removes transaction and returns deleted one", async () => {
    const existing = demoTransactions[0];
    localStorage.setItem("demoTransactions", JSON.stringify([existing]));

    const deleted = await transactionApi.deleteTransaction(existing.id);
    const stored = JSON.parse(localStorage.getItem("demoTransactions")!);

    expect(deleted.id).toBe(existing.id);
    expect(stored).toHaveLength(0);
  });

  it("deleteTransaction throws if transaction not found", async () => {
    await expect(transactionApi.deleteTransaction("fake-id")).rejects.toThrow(
      "Transaction not found"
    );
  });
});
