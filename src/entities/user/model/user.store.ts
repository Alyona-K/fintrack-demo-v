// import { create } from "zustand";
// import { userApi } from "./user.api";
// import type { User, UpdateUserPayload } from "./user.types";

// interface UserState {
//   user: User | null;
//   fetchUser: (id: number) => Promise<void>;
//   updateUser: (data: UpdateUserPayload) => Promise<void>;
//   createUser: (data: Omit<User, "id">) => Promise<void>;
//   setUser: (user: User | null) => void;
// }

// export const useUserStore = create<UserState>((set, get) => ({
//   user: null,

//   setUser: (user) => set({ user }),

//   fetchUser: async (id: number) => {
//     try {
//       const data = await userApi.getById(id);
//       set({ user: data });
//     } catch (e) {
//       console.error("Failed to fetch user:", e);
//     }
//   },

//   updateUser: async (data: UpdateUserPayload) => {
//     const current = get().user;
//     if (!current) return;
//     try {
//       const updated = await userApi.update(current.id, data);
//       set({ user: updated });
//     } catch (e) {
//       console.error("Failed to update user:", e);
//     }
//   },

//   createUser: async (data: Omit<User, "id">) => {
//     try {
//       const newUser = await userApi.create(data);
//       set({ user: newUser });
//     } catch (e) {
//       console.error("Failed to create user:", e);
//     }
//   },
// }));

//-----------

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
      storage: localStorageAdapter<{ user: User | null }>(), // адаптер с типом только поля user
      partialize: (state) => ({ user: state.user }), // сохраняем только объект user
    }
  )
);


//-----------

// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { userApi } from "./user.api";
// import type { User, UpdateUserPayload } from "@/entities/user/model/user.types";

// interface UserState {
//   user: User | null;
//   fetchUser: (id: number) => Promise<void>;
//   updateUser: (data: UpdateUserPayload) => Promise<void>;
//   setUser: (user: User | null) => void;
// }

// export const useUserStore = create<UserState>()(
//   persist(
//     (set, get) => ({
//       user: null,

//       setUser: (user) => set({ user }),

//       fetchUser: async (id) => {
//         try {
//           const data = await userApi.getById(id);
//           set({ user: data });
//         } catch (e) {
//           console.error("Failed to fetch user:", e);
//         }
//       },

//       updateUser: async (data) => {
//         const current = get().user;
//         if (!current) return;
//         try {
//           const updated = await userApi.update(current.id, data);
//           set({ user: updated });
//         } catch (e) {
//           console.error("Failed to update user:", e);
//         }
//       },
//     }),
//     {
//       name: "user-storage", // локальное сохранение в localStorage
//     }
//   )
// );

//-------------


// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { userApi } from "./user.api";
// import type { User, UpdateUserPayload } from "./user.types";

// interface UserState {
//   user: User | null;
//   fetchUser: (id: number) => Promise<void>;
//   updateUser: (data: UpdateUserPayload) => Promise<void>;
//   setUser: (user: User | null) => void;
// }

// export const useUserStore = create<UserState>()(
//   persist(
//     (set, get) => ({
//       user: null,

//       setUser: (user) => set({ user }),

//       fetchUser: async (id) => {
//         const data = await userApi.getById(id);
//         set({ user: data });
//       },

//       updateUser: async (data) => {
//         const current = get().user;
//         if (!current) return;
//         const updated = await userApi.update(current.id, data);
//         set({ user: updated });
//       },
//     }),
//     {
//       name: "user-storage",
//     }
//   )
// );
