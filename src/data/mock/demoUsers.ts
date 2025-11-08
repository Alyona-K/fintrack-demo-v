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
    location: "Canada",
  },
    {
    id: 2,
    email: "demo2@email.com",
    password: "$2b$10$lY3PXkQI0DeXtBVpQIAKGuT3D.as8w7rXp.T5lGQ72KcRfpC3hOVO",
    firstName: "Alex",
    lastName: "Bennett",
    avatar: "https://res.cloudinary.com/dlz6x4ygk/image/upload/v1762525450/fintrack/avatars/male-avatar_dgsop6.png",
    location: "USA",
  },
];

// Функция для получения пользователей
export const getDemoUsers = async (): Promise<User[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(demoUsers), 200));
};
