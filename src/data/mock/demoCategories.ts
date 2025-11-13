import { Category } from "@/entities/category/model/category.types";

export const demoCategories: Category[] = [
  {
    id: "software",
    name: "Software",
    type: "Expenses",
    userId: 1,
    isDeleted: false,
  },
  {
    id: "food-groceries",
    name: "Food/Groceries",
    type: "Expenses",
    userId: 1,
    isDeleted: false,
  },
  {
    id: "transport",
    name: "Transport",
    type: "Expenses",
    userId: 1,
    isDeleted: false,
  },
  {
    id: "salary",
    name: "Salary",
    type: "Income",
    userId: 1,
    isDeleted: false,
  },
  {
    id: "subscriptions",
    name: "Subscriptions",
    type: "Expenses",
    userId: 1,
    isDeleted: false,
  },
  {
    id: "shopping-clothing",
    name: "Shopping/Clothing",
    type: "Expenses",
    userId: 1,
    isDeleted: false,
  },
  {
    id: "health-fitness",
    name: "Health/Fitness",
    type: "Expenses",
    userId: 1,
    isDeleted: false,
  },
  {
    id: "investments",
    name: "Investments",
    type: "Income",
    userId: 1,
    isDeleted: false,
  },
  {
    id: "education",
    name: "Education/Courses",
    type: "Expenses",
    userId: 1,
    isDeleted: false,
  },
  {
    id: "travel",
    name: "Travel",
    type: "Expenses",
    userId: 1,
    isDeleted: false,
  },
  {
    id: "gifts",
    name: "Gifts",
    type: "Expenses",
    userId: 1,
    isDeleted: false,
  },
  {
    id: "rent",
    name: "Rent",
    type: "Expenses",
    userId: 1,
    isDeleted: false,
  },
  {
    id: "cash",
    name: "Cash",
    type: "Expenses",
    userId: 1,
    isDeleted: false,
  },
  {
    id: "daily-care",
    name: "Daily care",
    type: "Expenses",
    userId: 1,
    isDeleted: false,
  },
  {
    id: "d462cb3d-2b6b-419c-8d74-e557818b1fa9",
    name: "Food",
    type: "Expenses",
    userId: 2,
    isDeleted: false,
  },
  {
    id: "817a62d7-ec60-40c8-ac27-0c3c59d60e9e",
    name: "Salary",
    type: "Income",
    userId: 2,
    isDeleted: false,
  },
  {
    id: "b09bacdb-8007-47e5-9ed5-a07d83ec3d5a",
    name: "Transport",
    type: "Expenses",
    userId: 2,
    isDeleted: false,
  },
  {
    id: "78a376b2-c18d-439d-84bf-ae7725646b20",
    name: "Cash",
    type: "Expenses",
    userId: 2,
    isDeleted: false,
  },
];

export const getDemoCategories = async (): Promise<Category[]> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(demoCategories), 200)
  );
};
