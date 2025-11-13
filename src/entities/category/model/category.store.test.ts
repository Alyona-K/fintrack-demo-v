// --- MOCKS ---
jest.mock("@/entities/user/model/user.store", () => ({
  useUserStore: {
    getState: jest.fn(() => ({
      user: {
        id: 1,
        email: "user@test.com",
        firstName: "Test",
        lastName: "User",
        avatar: "",
      },
      setUser: jest.fn(),
    })),
  },
}));

// --- IMPORTS ---
import { act } from "@testing-library/react";
import { useCategoriesStore } from "./category.store";
import { Category } from "@/entities/category/model/category.types";

// --- TESTS ---
describe("Categories Store (demo)", () => {
  const STORAGE_KEY = "demoCategories";

  const demoCats: Category[] = [
    { id: "1", name: "Food", type: "Expenses", userId: 1, isDeleted: false },
    { id: "2", name: "Salary", type: "Income", userId: 1, isDeleted: false },
    {
      id: "3",
      name: "OtherUserCat",
      type: "Income",
      userId: 2,
      isDeleted: false,
    },
  ];

  beforeEach(() => {
    localStorage.clear();
    useCategoriesStore.setState({ categories: [], isLoading: false });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoCats));
  });

  // --- FETCH ---
  it("fetches categories for current user", async () => {
    await act(async () => {
      await useCategoriesStore.getState().fetchCategories();
    });

    const state = useCategoriesStore.getState();
    expect(state.categories).toHaveLength(2); // только userId = 1
    expect(state.categories.map((c) => c.name)).toEqual(["Food", "Salary"]);
    expect(state.isLoading).toBe(false);
  });

  // --- ADD ---
  it("adds a new category", async () => {
    await act(async () => {
      await useCategoriesStore.getState().addCategory({
        name: "Books",
        type: "Expenses",
        userId: 1,
      });
    });

    const state = useCategoriesStore.getState();
    expect(state.categories.some((c) => c.name === "Books")).toBe(true);

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored.some((c: Category) => c.name === "Books")).toBe(true);
  });

  // --- UPDATE ---
  it("updates an existing category", async () => {
    await act(async () => {
      await useCategoriesStore.getState().fetchCategories();
      await useCategoriesStore.getState().updateCategory({
        id: "1",
        name: "Groceries",
        type: "Expenses",
        userId: 1,
        isDeleted: false,
      });
    });

    const state = useCategoriesStore.getState();
    expect(state.categories.find((c) => c.id === "1")?.name).toBe("Groceries");

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored.find((c: Category) => c.id === "1")?.name).toBe("Groceries");
  });

  // --- DELETE ---
  it("deletes a category", async () => {
    await act(async () => {
      await useCategoriesStore.getState().deleteCategory("1");
    });

    const state = useCategoriesStore.getState();
    expect(state.categories.find((c) => c.id === "1")).toBeUndefined();

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored.find((c: Category) => c.id === "1")?.isDeleted).toBe(true);
  });

  // --- CLEAR ---
  it("clears categories", () => {
    act(() => {
      useCategoriesStore.getState().clearCategories();
    });

    const state = useCategoriesStore.getState();
    expect(state.categories).toEqual([]);
  });
});
