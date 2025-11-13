// --- MOCK user.store ---
jest.mock("@/entities/user/model/user.store", () => ({
  useUserStore: {
    getState: () => ({
      user: {
        id: 1,
        email: "user@test.com",
        firstName: "Test",
        lastName: "User",
        avatar: "",
      },
    }),
  },
}));

// --- MOCK API ---
jest.mock("./transaction.api", () => ({
  transactionApi: {
    getTransactions: jest.fn(),
    createTransaction: jest.fn(),
    updateTransaction: jest.fn(),
    deleteTransaction: jest.fn(),
  },
}));

import { act } from "@testing-library/react";
import { useTransactionsStore } from "./transaction.store";
import { transactionApi } from "./transaction.api";
import { Transaction } from "./transaction.types";

const mockedApi = transactionApi as jest.Mocked<typeof transactionApi>;

describe("Transactions Store (Local Demo)", () => {
  const mockTransactions: Transaction[] = [
    {
      id: "1",
      amount: 100,
      categoryId: "a",
      date: "2025-11-01",
      type: "Income",
      description: "Salary",
      userId: 1,
    },
    {
      id: "2",
      amount: 50,
      categoryId: "b",
      date: "2025-11-02",
      type: "Expenses",
      description: "Groceries",
      userId: 1,
    },
    {
      id: "3",
      amount: 30,
      categoryId: "c",
      date: "2025-11-03",
      type: "Income",
      description: "Gift",
      userId: 2,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    useTransactionsStore.setState({ transactions: [], isLoading: false });
  });

  // --- FETCH ---
  it("fetches only current user's transactions", async () => {
    mockedApi.getTransactions.mockResolvedValue(mockTransactions);

    await act(async () => {
      await useTransactionsStore.getState().fetchTransactions();
    });

    const { transactions, isLoading } = useTransactionsStore.getState();
    expect(mockedApi.getTransactions).toHaveBeenCalled();
    expect(transactions).toHaveLength(2);
    expect(transactions.every((t) => t.userId === 1)).toBe(true);
    expect(isLoading).toBe(false);
  });

  // --- ADD ---
  it("adds a new transaction", async () => {
    const newTx: Transaction = {
      id: "4",
      amount: 200,
      categoryId: "d",
      date: "2025-11-05",
      type: "Income",
      description: "Bonus",
      userId: 1,
    };
    mockedApi.createTransaction.mockResolvedValue(newTx);

    let created: Transaction | undefined;
    await act(async () => {
      created = await useTransactionsStore.getState().addTransaction({
        amount: 200,
        categoryId: "d",
        date: "2025-11-05",
        type: "Income",
        description: "Bonus",
        userId: 1,
      });
    });

    const { transactions, isLoading } = useTransactionsStore.getState();
    expect(mockedApi.createTransaction).toHaveBeenCalledWith({
      amount: 200,
      categoryId: "d",
      date: "2025-11-05",
      type: "Income",
      description: "Bonus",
      userId: 1,
    });
    expect(transactions[0]).toEqual(newTx);
    expect(isLoading).toBe(false);
    expect(created).toEqual(newTx);
  });

  // --- UPDATE ---
  it("updates an existing transaction", async () => {
    useTransactionsStore.setState({
      transactions: [mockTransactions[0]],
    });

    const updatedTx = { ...mockTransactions[0], amount: 150 };
    mockedApi.updateTransaction.mockResolvedValue(updatedTx);

    await act(async () => {
      await useTransactionsStore.getState().updateTransaction(updatedTx);
    });

    const { transactions } = useTransactionsStore.getState();
    expect(mockedApi.updateTransaction).toHaveBeenCalledWith(updatedTx);
    expect(transactions[0].amount).toBe(150);
  });

  // --- DELETE ---
  it("deletes a transaction", async () => {
    useTransactionsStore.setState({
      transactions: mockTransactions.slice(0, 2),
    });
    mockedApi.deleteTransaction.mockResolvedValue(mockTransactions[0]);

    await act(async () => {
      await useTransactionsStore.getState().deleteTransaction("1");
    });

    const { transactions } = useTransactionsStore.getState();
    expect(mockedApi.deleteTransaction).toHaveBeenCalledWith("1");
    expect(transactions).toHaveLength(1);
    expect(transactions[0].id).toBe("2");
  });

  // --- CLEAR ---
  it("clears all transactions", () => {
    useTransactionsStore.setState({ transactions: mockTransactions });
    act(() => useTransactionsStore.getState().clearTransactions());
    expect(useTransactionsStore.getState().transactions).toEqual([]);
  });
});
