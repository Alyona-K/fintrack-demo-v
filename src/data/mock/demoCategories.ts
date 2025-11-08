import { Category } from "@/entities/category/model/category.types";

// Пример демо-категорий
export const demoCategories: Category[] = [
  {
    id: "software",
    name: "Software",
    type: "Expenses",
    userId: 1,
    isDeleted: false
  },
  {
    id: "food-groceries",
    name: "Food/Groceries",
    type: "Expenses",
    userId: 1,
    isDeleted: false
  },
  {
    id: "transport",
    name: "Transport",
    type: "Expenses",
    userId: 1,
    isDeleted: false
  },
  {
    id: "salary",
    name: "Salary",
    type: "Income",
    userId: 1,
    isDeleted: false
  },
  {
    id: "subscriptions",
    name: "Subscriptions",
    type: "Expenses",
    userId: 1,
    isDeleted: false
  },
  {
    id: "shopping-clothing",
    name: "Shopping/Clothing",
    type: "Expenses",
    userId: 1,
    isDeleted: false
  },
  {
    id: "health-fitness",
    name: "Health/Fitness",
    type: "Expenses",
    userId: 1,
    isDeleted: false
  },
  {
    id: "investments",
    name: "Investments",
    type: "Income",
    userId: 1,
    isDeleted: false
  },
  {
    id: "education",
    name: "Education/Courses",
    type: "Expenses",
    userId: 1,
    isDeleted: false
  },
  {
    id: "18e3c6c6-164d-4589-9340-0eb9257a16f8",
    name: "Travel",
    type: "Expenses",
    userId: 1,
    isDeleted: false
  },
  {
    id: "5e92339c-a451-430f-aeb0-11d9ee5a3aa5",
    name: "Gifts",
    type: "Expenses",
    userId: 1,
    isDeleted: false
  },
  {
    id: "a7f4cb59-77f6-4ce1-a307-849d8be8c278",
    name: "Rent",
    type: "Expenses",
    userId: 1,
    isDeleted: false
  },
  {
    id: "abad810f-f195-46ed-9c8f-6be7d9c6a0fc",
    name: "Cash",
    type: "Expenses",
    userId: 1,
    isDeleted: false
  },
  {
    id: "55610bb6-4056-423d-8d0f-43674e58823c",
    name: "a",
    type: "Income",
    userId: 1,
    isDeleted: true
  }
];

// Функция для получения категорий
export const getDemoCategories = async (): Promise<Category[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(demoCategories), 200));
};