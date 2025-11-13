// --- IMAGE MOCKS ---
jest.mock("@/assets/images/fintrack-logo.png", () => "logo-mock", {
  virtual: true,
});
jest.mock("@/assets/images/default_avatar.png", () => "avatar-mock", {
  virtual: true,
});
jest.mock("@/assets/images/home-banner.png", () => "home-banner-mock", {
  virtual: true,
});
jest.mock("@/assets/images/sprite.svg", () => "sprite-mock", { virtual: true });

// --- CLEAR USER DATA MOCK ---
jest.mock("@/shared/lib/clearUserData", () => ({ clearUserData: jest.fn() }));

// --- TYPES ---
type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
};

// --- AUTH STORE MOCK ---
jest.mock("@/entities/auth/model/auth.store", () => {
  const authStoreState = {
    token: null as string | null,
    isLoading: false,
    initDemoUser: jest.fn(async () => {
      const userStore =
        require("@/entities/user/model/user.store").useUserStore.getState();
      userStore.setUser(require("@/data/mock/demoUsers").demoUsers[0]);

      const categoriesStore =
        require("@/entities/category/model/category.store").useCategoriesStore.getState();
      const transactionsStore =
        require("@/entities/transaction/model/transaction.store").useTransactionsStore.getState();

      categoriesStore.fetchCategories();
      transactionsStore.fetchTransactions();
    }),
  };
  const useAuthStoreMock: any = jest.fn((selector: any) =>
    selector(authStoreState)
  );
  useAuthStoreMock.getState = () => authStoreState;
  return { useAuthStore: useAuthStoreMock };
});

// --- USER STORE MOCK ---
jest.mock("@/entities/user/model/user.store", () => {
  let currentUser: User | null = null;
  const listeners: (() => void)[] = [];

  const userStore = {
    get user(): User | null {
      return currentUser;
    },
    setUser: (u: User | null) => {
      currentUser = u;
      listeners.forEach((fn) => fn());
    },
    subscribe: (fn: () => void) => {
      listeners.push(fn);
      return () => {};
    },
  };

  const useUserStoreMock: any = jest.fn((selector: any) => selector(userStore));
  useUserStoreMock.getState = () => userStore;
  return { useUserStore: useUserStoreMock };
});

// --- CATEGORIES STORE MOCK ---
jest.mock("@/entities/category/model/category.store", () => {
  const categoriesStore = {
    categories: [] as Category[],
    fetchCategories: jest.fn(() => {
      categoriesStore.categories =
        require("@/data/mock/demoCategories").demoCategories;
    }),
  };
  const useCategoriesStoreMock: any = () => categoriesStore;
  useCategoriesStoreMock.getState = () => categoriesStore;
  return { useCategoriesStore: useCategoriesStoreMock };
});

// --- TRANSACTIONS STORE MOCK ---
jest.mock("@/entities/transaction/model/transaction.store", () => {
  const transactionsStore = {
    transactions: [] as Transaction[],
    fetchTransactions: jest.fn(() => {
      transactionsStore.transactions =
        require("@/data/mock/demoTransactions").demoTransactions;
    }),
  };
  const useTransactionsStoreMock: any = () => transactionsStore;
  useTransactionsStoreMock.getState = () => transactionsStore;
  return { useTransactionsStore: useTransactionsStoreMock };
});

jest.mock("@/shared/lib/clearUserData", () => ({
  clearUserData: jest.fn(),
}));

import { render, screen, waitFor, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AppInit } from "./AppInit";
import { useUserStore } from "@/entities/user/model/user.store";
import { demoCategories } from "@/data/mock/demoCategories";
import { demoTransactions } from "@/data/mock/demoTransactions";
import type { Category } from "@/entities/category/model/category.types";
import type { Transaction } from "@/entities/transaction/model/transaction.types";
import { clearUserData } from "@/shared/lib/clearUserData";

// --- TESTS ---
describe("App (demo mode)", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const userStore =
      require("@/entities/user/model/user.store").useUserStore.getState();
    const authStore =
      require("@/entities/auth/model/auth.store").useAuthStore.getState();

    userStore.setUser(null);
    authStore.token = null;
  });

  it("renders loading spinner initially if no token and not on auth page", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText(/Loading user/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/Loading user/i)).not.toBeInTheDocument();
    });
  });

  it("calls initDemoUser and sets demo user and demo data", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
    });

    const authStore =
      require("@/entities/auth/model/auth.store").useAuthStore.getState();
    await waitFor(() => expect(authStore.initDemoUser).toHaveBeenCalled());

    const userStore =
      require("@/entities/user/model/user.store").useUserStore.getState();
    const categoriesStore =
      require("@/entities/category/model/category.store").useCategoriesStore.getState();
    const transactionsStore =
      require("@/entities/transaction/model/transaction.store").useTransactionsStore.getState();

    expect(userStore.user?.email).toBe("demo@fintrack.com");
    expect(categoriesStore.categories).toEqual(demoCategories);
    expect(transactionsStore.transactions).toEqual(demoTransactions);
  });

  it("renders Sidebar and Topbar for demo user", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId("sidebar")).toBeInTheDocument();
      expect(screen.getByTestId("topbar")).toBeInTheDocument();
    });
  });

  it("does not render Sidebar/Topbar on auth pages", async () => {
    window.history.pushState({}, "Login page", "/login");

    await act(async () => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(screen.queryByTestId("sidebar")).not.toBeInTheDocument();
      expect(screen.queryByTestId("topbar")).not.toBeInTheDocument();
    });
  });

  it("calls clearUserData when switching from non-demo to demo user", async () => {
    const userStore = useUserStore.getState();

    act(() => {
      userStore.setUser({
        id: 1,
        email: "user@example.com",
        firstName: "Test",
        lastName: "User",
        avatar: "avatar-mock",
      });
    });

    const { rerender } = render(
      <BrowserRouter>
        <AppInit>
          <App />
        </AppInit>
      </BrowserRouter>
    );

    act(() => {
      userStore.setUser({
        id: 2,
        email: "demo@fintrack.com",
        firstName: "Demo",
        lastName: "User",
        avatar: "avatar-mock",
      });
    });

    rerender(
      <BrowserRouter>
        <AppInit>
          <App />
        </AppInit>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(clearUserData).toHaveBeenCalled();
    });
  });
});
