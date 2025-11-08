// import {
//   LoginCredentials,
//   RegisterCredentials,
//   AuthResponse,
// } from "./auth.types";
// import { useUserStore } from "@/entities/user/model/user.store";
// import { userApi } from "@/entities/user/model/user.api";
// import type { User } from "@/entities/user/model/user.types";

// export const authApi = {
//   async login(credentials: LoginCredentials): Promise<AuthResponse> {
//     const users = await userApi.getAll();
//     const user = users.find(
//       (u) =>
//         u.email === credentials.email && u.password === credentials.password
//     );
//     if (!user) throw new Error("Invalid credentials");

//     useUserStore.getState().setUser(user);
//     return new Promise((resolve) =>
//       setTimeout(() => resolve({ user, accessToken: "demo-token" }), 200)
//     );
//   },

//   async register(credentials: RegisterCredentials): Promise<AuthResponse> {
//     const users = await userApi.getAll();
//     if (users.some((u) => u.email === credentials.email)) {
//       throw new Error("User with this email already exists");
//     }

//     const newUser = await userApi.create({
//       ...credentials,
//       avatar: "",
//       location: "",
//     });
//     useUserStore.getState().setUser(newUser);

//     return new Promise((resolve) =>
//       setTimeout(
//         () => resolve({ user: newUser, accessToken: "demo-token" }),
//         200
//       )
//     );
//   },

//   async getCurrentUser(): Promise<User> {
//     const { user } = useUserStore.getState();
//     if (!user) throw new Error("User not logged in");
//     await new Promise((res) => setTimeout(res, 200));
//     return user;
//   },
// };

//------------

import { LoginCredentials, RegisterCredentials, AuthResponse } from "./auth.types";
import { demoUsers } from "@/data/mock/demoUsers";
import { useUserStore } from "@/entities/user/model/user.store";

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const user = demoUsers.find(u => u.email === credentials.email);
    if (!user) throw new Error("Invalid credentials");

    useUserStore.getState().setUser(user);
    return new Promise(resolve => setTimeout(() => resolve({ user, accessToken: "demo-token" }), 200));
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const id = demoUsers.length + 1;
    const newUser = { id, ...credentials, avatar: "", location: "" };
    demoUsers.push(newUser);

    useUserStore.getState().setUser(newUser);
    return new Promise(resolve => setTimeout(() => resolve({ user: newUser, accessToken: "demo-token" }), 200));
  },

  async getCurrentUser(): Promise<typeof demoUsers[0]> {
    const { user } = useUserStore.getState();
    if (!user) throw new Error("User not logged in");
    return new Promise(resolve => setTimeout(() => resolve(user), 200));
  },
};

//---------------

// import { api } from "@/shared/lib/api";
// import {
//   AuthResponse,
//   LoginCredentials,
//   RegisterCredentials,
// } from "./auth.types";
// import { useUserStore } from "@/entities/user/model/user.store";

// export const authApi = {
//   async login(credentials: LoginCredentials): Promise<AuthResponse> {
//     const { data } = await api.post<AuthResponse>("/login", credentials);
//     return data;
//   },

//   async register(credentials: RegisterCredentials): Promise<AuthResponse> {
//     const { data } = await api.post<AuthResponse>("/register", credentials);
//     return data;
//   },

//   async getCurrentUser(): Promise<AuthResponse["user"]> {
//     const { user } = useUserStore.getState();
//     if (!user) throw new Error("User not logged in");
//     return user;
//   },
// };
