import { create } from "zustand";
import { Category } from "./category.types";
import { useUserStore } from "@/entities/user/model/user.store";
import { categoryApi } from "./category.api";

type CategoriesState = {
  categories: Category[];
  isLoading: boolean;
  fetchCategories: () => Promise<void>;
  addCategory: (category: Omit<Category, "id">) => Promise<Category>;
  updateCategory: (category: Category) => Promise<Category>;
  deleteCategory: (id: string) => Promise<void>;
  clearCategories: () => void;
};

export const useCategoriesStore = create<CategoriesState>((set, get) => ({
  categories: [],
  isLoading: false,

  fetchCategories: async () => {
    set({ isLoading: true });
    try {
      const user = useUserStore.getState().user;
      if (!user) {
        set({ categories: [] });
        return;
      }

      const data = await categoryApi.getCategories();
      const filtered = data.filter((c) => c.userId === user.id && !c.isDeleted);
      set({ categories: filtered });
    } catch (e) {
      console.error("Error fetching categories:", e);
    } finally {
      set({ isLoading: false });
    }
  },

  addCategory: async (category) => {
    set({ isLoading: true });
    try {
      const created = await categoryApi.createCategory(category);
      set((state) => ({
        categories: [...state.categories, created].sort((a, b) =>
          a.name.localeCompare(b.name)
        ),
      }));
      return created;
    } catch (e) {
      console.error("Error adding category:", e);
      throw e;
    } finally {
      set({ isLoading: false });
    }
  },

  updateCategory: async (category) => {
    set({ isLoading: true });
    try {
      const updated = await categoryApi.updateCategory(category);
      set((state) => ({
        categories: state.categories
          .map((c) => (c.id === updated.id ? updated : c))
          .sort((a, b) => a.name.localeCompare(b.name)),
      }));
      return updated;
    } catch (e) {
      console.error("Error updating category:", e);
      throw e;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteCategory: async (id) => {
    set({ isLoading: true });
    try {
      await categoryApi.deleteCategory(id);
      set((state) => ({
        categories: state.categories.filter((c) => c.id !== id),
      }));
    } catch (e) {
      console.error("Error deleting category:", e);
      throw e;
    } finally {
      set({ isLoading: false });
    }
  },

  clearCategories: () => set({ categories: [] }),
}));
