import { Category } from "./category.types";
import { demoCategories } from "@/data/mock/demoCategories";
import { useUserStore } from "@/entities/user/model/user.store";

const STORAGE_KEY = "demoCategories";

// Загружаем категории из localStorage или берем моки
const loadCategories = (): Category[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [...demoCategories];
};

// Сохраняем категории в localStorage
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

//-----------

// import { Category } from "./category.types";
// import { demoCategories } from "@/data/mock/demoCategories";
// import { useUserStore } from "@/entities/user/model/user.store";

// const STORAGE_KEY = "demoCategories";

// const loadCategories = (): Category[] => {
//   const stored = localStorage.getItem(STORAGE_KEY);
//   return stored ? JSON.parse(stored) : [...demoCategories];
// };

// const saveCategories = (categories: Category[]) => {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
// };

// export const categoryApi = {
//   async getCategories(): Promise<Category[]> {
//     const categories = demoCategories.filter(c => !c.isDeleted);
//     return new Promise(resolve => setTimeout(() => resolve(categories.sort((a,b) => a.name.localeCompare(b.name))), 200));
//   },

//   async createCategory(category: Omit<Category, "id">): Promise<Category> {
//     const { user } = useUserStore.getState();
//     if (!user) throw new Error("User not logged in");

//     const newCategory: Category = { ...category, id: `cat-${Date.now()}`, userId: user.id, isDeleted: false };
//     demoCategories.push(newCategory);

//     return new Promise(resolve => setTimeout(() => resolve(newCategory), 200));
//   },

//   async updateCategory(category: Category): Promise<Category> {
//     const idx = demoCategories.findIndex(c => c.id === category.id);
//     if (idx === -1) throw new Error("Category not found");

//     demoCategories[idx] = { ...demoCategories[idx], ...category };
//     return new Promise(resolve => setTimeout(() => resolve(demoCategories[idx]), 200));
//   },

//   async deleteCategory(id: string): Promise<Category> {
//     const idx = demoCategories.findIndex(c => c.id === id);
//     if (idx === -1) throw new Error("Category not found");

//     demoCategories[idx].isDeleted = true;
//     return new Promise(resolve => setTimeout(() => resolve(demoCategories[idx]), 200));
//   },
// };

//---------------

// import { api } from "@/shared/lib/api";
// import { Category } from "./category.types";
// import { useUserStore } from "@/entities/user/model/user.store";

// export const getCategories = async (): Promise<Category[]> => {
//   const { data } = await api.get<Category[]>("/categories");
//   return data.sort((a, b) => a.name.localeCompare(b.name));
// };

// export const createCategory = async (
//   category: Omit<Category, "id">
// ): Promise<Category> => {
//   const { user } = useUserStore.getState();
//   if (!user) throw new Error("User not logged in");

//   const { data } = await api.post<Category>("/categories", {
//     ...category,
//     userId: user.id,
//   });
//   return data;
// };

// export const updateCategoryApi = async (
//   category: Category
// ): Promise<Category> => {
//   if (!category.id) throw new Error("Category id is required");
//   if (!category.name?.trim()) throw new Error("Name is required");
//   if (!["Income", "Expenses"].includes(category.type))
//     throw new Error("Invalid type");

//   const { data } = await api.put<Category>(
//     `/categories/${category.id}`,
//     category
//   );
//   return data;
// };

// export const deleteCategoryApi = async (id: string): Promise<Category> => {
//   const { data } = await api.delete<Category>(`/categories/${id}`);
//   return data;
// };
