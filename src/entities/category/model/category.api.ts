import { Category } from "./category.types";
import { demoCategories } from "@/data/mock/demoCategories";
import { useUserStore } from "@/entities/user/model/user.store";

const STORAGE_KEY = "demoCategories";

const loadCategories = (): Category[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [...demoCategories];
};

const saveCategories = (categories: Category[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
};

export const categoryApi = {
  async getCategories(): Promise<Category[]> {
    const categories = loadCategories().filter((c) => !c.isDeleted);
    return new Promise((resolve) =>
      setTimeout(
        () => resolve(categories.sort((a, b) => a.name.localeCompare(b.name))),
        200
      )
    );
  },

  async createCategory(category: Omit<Category, "id">): Promise<Category> {
    const { user } = useUserStore.getState();
    if (!user) throw new Error("User not logged in");

    const newCategory: Category = {
      ...category,
      id: `cat-${Date.now()}`,
      userId: user.id,
      isDeleted: false,
    };

    const categories = loadCategories();
    categories.push(newCategory);
    saveCategories(categories);

    return new Promise((resolve) =>
      setTimeout(() => resolve(newCategory), 200)
    );
  },

  async updateCategory(category: Category): Promise<Category> {
    const categories = loadCategories();
    const idx = categories.findIndex((c) => c.id === category.id);
    if (idx === -1) throw new Error("Category not found");

    categories[idx] = { ...categories[idx], ...category };
    saveCategories(categories);

    return new Promise((resolve) =>
      setTimeout(() => resolve(categories[idx]), 200)
    );
  },

  async deleteCategory(id: string): Promise<Category> {
    const categories = loadCategories();
    const idx = categories.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error("Category not found");

    categories[idx].isDeleted = true;
    saveCategories(categories);

    return new Promise((resolve) =>
      setTimeout(() => resolve(categories[idx]), 200)
    );
  },
};
