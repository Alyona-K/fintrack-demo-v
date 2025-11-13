// --- MOCK USER STORE ---
jest.mock("@/entities/user/model/user.store");

// --- IMPORTS ---
import { authApi } from "./auth.api";
import { useUserStore } from "@/entities/user/model/user.store";
import type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "./auth.types";
import type { User } from "@/entities/user/model/user.types";
import { demoUsers } from "@/data/mock/demoUsers";

const mockedUserStore = useUserStore as jest.Mocked<any>;

describe("authApi (demo)", () => {
  const testUser: User = {
    id: 999,
    email: "alice@test.com",
    firstName: "Alice",
    lastName: "Smith",
    avatar: "avatar.png",
    location: "NY",
  };

  beforeEach(() => {
    demoUsers.length = 0;
    demoUsers.push(testUser);

    // Мокаем setUser
    mockedUserStore.getState.mockReturnValue({
      user: null,
      setUser: jest.fn(),
    });
  });

  // --- LOGIN ---
  it("login sets user and returns AuthResponse", async () => {
    const credentials: LoginCredentials = {
      email: "alice@test.com",
      password: "any-password",
    };

    const response: AuthResponse = await authApi.login(credentials);

    expect(response.user).toEqual(testUser);
    expect(response.accessToken).toBe("demo-token");
    expect(mockedUserStore.getState().setUser).toHaveBeenCalledWith(testUser);
  });

  it("login throws for invalid email", async () => {
    const credentials: LoginCredentials = {
      email: "wrong@test.com",
      password: "123",
    };

    await expect(authApi.login(credentials)).rejects.toThrow(
      "Invalid credentials"
    );
  });

  // --- REGISTER ---
  it("register sets new user and returns AuthResponse", async () => {
    const credentials: RegisterCredentials = {
      email: "bob@test.com",
      password: "pass",
      firstName: "Bob",
      lastName: "Builder",
    };

    const response: AuthResponse = await authApi.register(credentials);

    expect(response.user.email).toBe("bob@test.com");
    expect(response.accessToken).toBe("demo-token");
    expect(mockedUserStore.getState().setUser).toHaveBeenCalledWith(
      response.user
    );
    expect(demoUsers.find((u) => u.email === "bob@test.com")).toBeTruthy();
  });

  // --- GET CURRENT USER ---
  it("getCurrentUser returns user from store", async () => {
    const mockedSetUser = jest.fn();
    mockedUserStore.getState.mockReturnValue({
      user: testUser,
      setUser: mockedSetUser,
    });

    const user = await authApi.getCurrentUser();
    expect(user).toEqual(testUser);
  });

  it("getCurrentUser throws if no user in store", async () => {
    mockedUserStore.getState.mockReturnValue({
      user: null,
      setUser: jest.fn(),
    });

    await expect(authApi.getCurrentUser()).rejects.toThrow(
      "User not logged in"
    );
  });
});
