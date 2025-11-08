import { User } from "@/entities/user/model/user.types";

// Пример демо-пользователей
export const demoUsers: User[] = [
  {
    id: 1,
    email: "demo@fintrack.com",
    password: "$2b$10$lY3PXkQI0DeXtBVpQIAKGuT3D.as8w7rXp.T5lGQ72KcRfpC3hOVO",
    firstName: "Julia",
    lastName: "Bennett",
    avatar: "/images/avatar.png",
  },
];

// Функция для получения пользователей
export const getDemoUsers = async (): Promise<User[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(demoUsers), 200));
};
