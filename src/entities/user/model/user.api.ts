// import type { User, UpdateUserPayload } from "./user.types";

// const STORAGE_KEY = "demoUsers";

// // Загружаем пользователей из localStorage или берем демо
// const loadUsers = (): User[] => {
//   const stored = localStorage.getItem(STORAGE_KEY);
//   return stored ? JSON.parse(stored) : [];
// };

// // Сохраняем пользователей в localStorage
// const saveUsers = (users: User[]) => {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
// };

// export const userApi = {
//   async getById(id: number): Promise<User> {
//     const users = loadUsers();
//     const user = users.find(u => u.id === id);
//     if (!user) throw new Error("User not found");
//     return new Promise(resolve => setTimeout(() => resolve(user), 200));
//   },

//   async update(id: number, payload: UpdateUserPayload): Promise<User> {
//     const users = loadUsers();
//     const idx = users.findIndex(u => u.id === id);
//     if (idx === -1) throw new Error("User not found");

//     users[idx] = { ...users[idx], ...payload };
//     saveUsers(users);

//     return new Promise(resolve => setTimeout(() => resolve(users[idx]), 200));
//   },

//   async create(userData: Omit<User, "id">): Promise<User> {
//     const users = loadUsers();
//     const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
//     const newUser: User = { id, ...userData };
//     users.push(newUser);
//     saveUsers(users);

//     return new Promise(resolve => setTimeout(() => resolve(newUser), 200));
//   },

//   async getAll(): Promise<User[]> {
//     const users = loadUsers();
//     return new Promise(resolve => setTimeout(() => resolve(users), 200));
//   },
// };


//-------------

import type { User, UpdateUserPayload } from "./user.types";
import { demoUsers } from "@/data/mock/demoUsers";

export const userApi = {
  async getById(id: number): Promise<User> {
    const user = demoUsers.find(u => u.id === id);
    if (!user) throw new Error("User not found");
    return new Promise(resolve => setTimeout(() => resolve(user), 200));
  },

  async update(id: number, payload: UpdateUserPayload): Promise<User> {
    const userIndex = demoUsers.findIndex(u => u.id === id);
    if (userIndex === -1) throw new Error("User not found");

    demoUsers[userIndex] = { ...demoUsers[userIndex], ...payload };
    return new Promise(resolve => setTimeout(() => resolve(demoUsers[userIndex]), 200));
  },
};

//--------------

// import { api } from "@/shared/lib/api";
// import type { User, UpdateUserPayload } from "./user.types";

// export const userApi = {
//   async getById(id: number): Promise<User> {
//     const { data } = await api.get(`/users/${id}`);
//     return data;
//   },

//   async update(id: number, payload: UpdateUserPayload): Promise<User> {
//     const { data } = await api.patch(`/users/${id}`, payload);
//     return data;
//   },
// };
