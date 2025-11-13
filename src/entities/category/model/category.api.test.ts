jest.mock("@/entities/user/model/user.store", () => ({
  useUserStore: {
    getState: jest.fn(),
  },
}));

import { categoryApi } from "./category.api";
import { Category } from "./category.types";
import { useUserStore } from "@/entities/user/model/user.store";
import { demoCategories } from "@/data/mock/demoCategories";

const mockedUserStore = useUserStore as jest.Mocked<typeof useUserStore>;

describe("categoryApi (demo)", () => {
  const STORAGE_KEY = "demoCategories";

  const mockUser = {
    id: 1,
    firstName: "Alice",
    lastName: "Smith",
    email: "user@test.com",
    avatar: "avatar.png",
    location: "NY",
  };

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    mockedUserStore.getState.mockReturnValue({
      user: mockUser,
      fetchUser: jest.fn(),
      updateUser: jest.fn(),
      setUser: jest.fn(),
    });
  });

  describe("getCategories", () => {
    it("returns sorted and filtered categories", async () => {
      localStorage.setItem(
        "demoCategories",
        JSON.stringify([
          { id: "1", name: "Salary", type: "Income", isDeleted: false },
          { id: "2", name: "Food", type: "Expenses", isDeleted: false },
          { id: "3", name: "Old", type: "Expenses", isDeleted: true },
        ])
      );

      const result = await categoryApi.getCategories();
      const names = result.map((c) => c.name);
      expect(names).toEqual(["Food", "Salary"]);
    });

    it("returns demoCategories if storage empty", async () => {
      localStorage.removeItem(STORAGE_KEY);
      const result = await categoryApi.getCategories();
      expect(result).toEqual(expect.arrayContaining(demoCategories));
    });
  });

  describe("createCategory", () => {
    it("creates a new category and saves to storage", async () => {
      const newCategory = { name: "Bonus", type: "Income" };
      const result = await categoryApi.createCategory(newCategory as any);

      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
      expect(result.name).toBe("Bonus");
      expect(result.userId).toBe(1);
      expect(stored.some((c: Category) => c.id === result.id)).toBe(true);
    });

    it("throws if user not logged in", async () => {
      mockedUserStore.getState.mockReturnValue({
        user: null,
        fetchUser: jest.fn(),
        updateUser: jest.fn(),
        setUser: jest.fn(),
      });

      await expect(
        categoryApi.createCategory({ name: "Test", type: "Income" } as any)
      ).rejects.toThrow("User not logged in");
    });
  });

  describe("updateCategory", () => {
    it("updates existing category", async () => {
      localStorage.setItem(
        "demoCategories",
        JSON.stringify([
          { id: "1", name: "Food", type: "Expenses", isDeleted: false },
        ])
      );

      const updated: Category = {
        id: "1",
        name: "Updated Food",
        type: "Expenses",
        userId: 1,
        isDeleted: false,
      };
      const result = await categoryApi.updateCategory(updated);

      expect(result.name).toBe("Updated Food");
    });

    it("throws if category not found", async () => {
      const missing = {
        id: "999",
        name: "Unknown",
        type: "Expenses",
        userId: 1,
      };
      await expect(categoryApi.updateCategory(missing as any)).rejects.toThrow(
        "Category not found"
      );
    });
  });

  describe("deleteCategory", () => {
    it("marks category as deleted", async () => {
      localStorage.setItem(
        "demoCategories",
        JSON.stringify([
          { id: "1", name: "Rent", type: "Expenses", isDeleted: false },
        ])
      );

      const result = await categoryApi.deleteCategory("1");

      expect(result.isDeleted).toBe(true);
      const stored = JSON.parse(localStorage.getItem("demoCategories")!);
      expect(stored[0].isDeleted).toBe(true);
    });

    it("throws if category not found", async () => {
      await expect(categoryApi.deleteCategory("999")).rejects.toThrow(
        "Category not found"
      );
    });
  });
});
