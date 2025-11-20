import { create } from "zustand";
import { persist } from "zustand/middleware";
import { localStorageAdapter } from "@/shared/lib/persistAdapter";
import { userApi } from "./user.api";
import type { User, UpdateUserPayload } from "@/entities/user/model/user.types";

interface UserState {
  user: User | null;
  fetchUser: (id: number) => Promise<void>;
  updateUser: (data: UpdateUserPayload) => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,

      setUser: (user) => set({ user }),

      fetchUser: async (id) => {
        try {
          const data = await userApi.getById(id);
          set({ user: data });
        } catch (e) {
          console.error("Failed to fetch user:", e);
        }
      },

      updateUser: async (data) => {
        const current = get().user;
        if (!current) return;
        try {
          const updated = await userApi.update(current.id, data);
          set({ user: updated });
        } catch (e) {
          console.error("Failed to update user:", e);
        }
      },
    }),
    {
      name: "user-storage",
      storage: localStorageAdapter<{ user: User | null }>(),
      partialize: (state) => ({ user: state.user }),
    }
  )
);
