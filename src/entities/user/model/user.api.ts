import type { User, UpdateUserPayload } from "./user.types";
import { demoUsers } from "@/data/mock/demoUsers";

export const userApi = {
  async getById(id: number): Promise<User> {
    const user = demoUsers.find((u) => u.id === id);
    if (!user) throw new Error("User not found");
    return new Promise((resolve) => setTimeout(() => resolve(user), 200));
  },

  async update(id: number, payload: UpdateUserPayload): Promise<User> {
    const userIndex = demoUsers.findIndex((u) => u.id === id);
    if (userIndex === -1) throw new Error("User not found");

    demoUsers[userIndex] = { ...demoUsers[userIndex], ...payload };
    return new Promise((resolve) =>
      setTimeout(() => resolve(demoUsers[userIndex]), 200)
    );
  },
};
