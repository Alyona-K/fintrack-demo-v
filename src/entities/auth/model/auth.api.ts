import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "./auth.types";
import { demoUsers } from "@/data/mock/demoUsers";
import { useUserStore } from "@/entities/user/model/user.store";

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const user = demoUsers.find((u) => u.email === credentials.email);
    if (!user) throw new Error("Invalid credentials");

    useUserStore.getState().setUser(user);
    return new Promise((resolve) =>
      setTimeout(() => resolve({ user, accessToken: "demo-token" }), 200)
    );
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const existing = demoUsers.find((u) => u.email === credentials.email);
    if (existing) {
      throw new Error("User with this email already exists");
    }

    const id = demoUsers.length + 1;
    const newUser = { id, ...credentials, avatar: "", location: "" };
    demoUsers.push(newUser);

    useUserStore.getState().setUser(newUser);

    return new Promise((resolve) =>
      setTimeout(
        () => resolve({ user: newUser, accessToken: "demo-token" }),
        200
      )
    );
  },

  async getCurrentUser(): Promise<(typeof demoUsers)[0]> {
    const { user } = useUserStore.getState();
    if (!user) throw new Error("User not logged in");
    return new Promise((resolve) => setTimeout(() => resolve(user), 200));
  },
};
