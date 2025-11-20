Available in: [Español](README.es.md)

# FinTrack Technical Documentation

---

FinTrack Demo is an SPA for personal finance tracking with a demo mode.  
The project demonstrates charts, tables, filters, and forms for adding/editing data. Fully typed, ready for local development and deployment.

---

## I. Project Goal

- Showcase modern frontend architecture using React + TypeScript
- State management with Zustand
- Form validation with Zod
- Data visualization with Recharts and Framer Motion
- SPA routing via React Router
- Demonstrate functionality through a demo mode

---

## II. Project Structure

public/ # static resources (icons, fonts, images)
src/
├─ app/ # initialization, providers, routing, ErrorBoundary
├─ entities/ # business entities: transactions, categories, users, widgets
├─ features/ # user actions (Add/Edit for transactions and categories)
├─ pages/ # container pages (Home, Overview, Login, Register, Profile, 404)
├─ shared/ # reusable components, hooks, utilities, styles, configs
└─ data/mock/# demo data: users, transactions, categories

**Config files:** `vite.config.ts`, `tsconfig.*.json`, `jest.config.ts`, `vercel.json`.

---

## III. Functionality

### 1. Authentication & Registration

- Pages: `src/pages/login`, `src/pages/register`
- Store: `src/entities/auth/*` (Zustand store, mock API, models)
- UI: `src/shared/ui/Input`, `Button`
- Form validation via Zod
- Auth state stored in `authStore`
- Demo user validated via mock JSON

### 2. Transactions CRUD

- Pages: `src/pages/transactions`
- Modals: `AddEditTransactionModal` (`src/features/transaction/...`)
- Store: `transactionStore`
- Forms: type, category, amount, date, description (Zod)
- Reactive list updates after changes
- Changes persisted in localStorage in demo mode

### 3. Categories CRUD

- Pages: `src/pages/categories`
- Modals: `AddEditCategoryModal` (`src/features/category/...`)
- Store: `categoryStore`
- Schema: name, type (Income/Expenses), color
- Used as reference for transactions
- Persisted in localStorage

### 4. Analytics & Widgets (Overview)

- Pages: `src/pages/overview`
- Widgets: balance, income, expenses, transaction count
- Charts: category charts, income/expenses dynamics (Recharts)
- Data calculated on the client via Zustand stores

### 5. Home

- Welcome page (`src/pages/home`)
- Static content, no business logic

### 6. User Profile

- Page: `src/pages/profile`
- Display and edit user data
- State via `userStore`

### 7. Shared UI

- Components: Button, Input, Modal, Loader, Sidebar, Topbar, etc.
- Reusable and fully typed with TypeScript

### 8. Zustand Stores

- Separate store per domain (auth, transaction, category, user)
- Methods: add, update, remove, setActive, reset
- State in memory + localStorage
- Reactivity via hooks (`useTransactionStore`, `useCategoryStore`)

---

## IV. Architecture (FSD / Feature-Sliced Design)

### Main Layers

- **app/** — app initialization: entry point (`index.tsx`), routing (`App.tsx`), providers, ErrorBoundary, global styles, and tests.
- **entities/** — core business entities and logic:
  - **user/**, **transaction/**, **category/**, **widget/**  
    Each entity contains:
    - `model/` — types, API, store, and unit tests  
    - `ui/` — reusable visual components (e.g., table rows)
  - **auth/** — separate entity with form validation and store
- **features/** — functional modules for user actions:
  - Examples: `AddEditTransaction`, `AddEditCategory`  
    Contain UI components for modals and tests
- **pages/** — container-level pages:
  - `Home`, `Overview`, `Transactions`, `Categories`, `Profile`, `Login`, `Register`, `404`  
  - Each page is split into:
    - `index.tsx` — page logic, calls features/entities  
    - `ui/` — only visual components
- **shared/** — reusable elements and utilities:
  - UI components (`Input`, `Button`, `Sidebar`, `Topbar`, modals, widgets)  
  - hooks (`useWidgetsData`, `useNotificationsStore`, etc.)  
  - utilities (`lib/`)  
  - global styles and variables  
  - mocks, tests, and configs
- **data/mock/** — demo data for development and presentation
- **assets/** — static resources: images, icons, fonts

### Layer Interaction

pages → features → entities → shared/api

- Pages use feature blocks
- Features operate on business entities
- Shared accessible by all layers
- App provides global providers and data initialization

### Principles

- Modular isolation
- Component reusability
- Aliases: @/shared, @/entities, @/features
- Lazy loading of pages (React.lazy + Suspense)
- Private route protection

---

## V. Backend (Demo)

- No real server; uses mock API + Zustand + localStorage
- Async operations ~200ms

### Mock Data

- `demoUsers`: { id, email, password, firstName, lastName, avatar, location }
- `demoCategories`: { id, name, type, userId, isDeleted }
- `demoTransactions`: { id, userId, categoryId, amount, type, date, description }

### Mock API

- `authApi` — login, register, getCurrentUser
- `categoryApi` — CRUD categories, soft delete
- `transactionApi` — CRUD transactions
- `userApi` — get/update user
- Validation via Zod

### Stores (Zustand)

- `useAuthStore`, `useUserStore`, `useCategoriesStore`, `useTransactionsStore`, `useWidgetsStore`
- Persist via localStorage
- Filter by userId

### Hooks

- `useTransactionsWithCategoryNames` — transactions with category names, memoized

---

## VI. Tech Stack

- **Frontend:** React 19, Vite, TypeScript, SCSS
- **Animations:** Framer Motion
- **Routing:** React Router v7
- **State:** Zustand, persist
- **Validation:** Zod
- **Dates:** date-fns, react-datepicker
- **Data visualization:** Recharts
- **Testing:** Jest, React Testing Library, ts-jest
- **Linting/Formatting:** ESLint, Prettier

---

## VII. Running the Project

### Dev

```bash
npm install
npm run dev
```

### Build / Production

```bash
npm run build
npm run preview
```

- Dev-server with HMR, TypeScript, JSX

- Build optimized for SPA

- Aliases preserved in build

---

## VIII. Testing

- Unit & snapshot tests for components, hooks, utilities

- Checks CRUD operations, UI, stores, mocks

- Jest + React Testing Library + ts-jest

- Isolated from real API and localStorage

---

## IX. Aliases

| Alias     | Path          | Example                                                                                                        |
| --------- | ------------- | -------------------------------------------------------------------------------------------------------------- |
| @         | src/          | import { formatDate } from "@/shared/lib/formatDate"                                                           |
| @app      | src/app/      | import { useAuthStore } from "@app/model/auth.store"                                                           |
| @pages    | src/pages/    | import TransactionsPage from "@pages/transactions"                                                             |
| @entities | src/entities/ | import { useTransactionsStore } from "@entities/transaction/model/transaction.store"                           |
| @features | src/features/ | import AddEditTransactionModal from "@features/transaction/AddEditTransactionModal/ui/AddEditTransactionModal" |
| @shared   | src/shared/   | import Button from "@shared/ui/Button"                                                                         |

---

## X. Deployment / Hosting

- Vercel: SPA fallback (rewrites → /index.html)

- React Router fully compatible with history

- Environment variables: VITE_BASENAME, VITE_API_URL, VITE_APP_NAME

- Demo fully functional on local data

---

## XI. Entity Types (TypeScript)

**User**

```ts
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  avatar: string;
  location?: string;
}

export type UpdateUserPayload = Partial<Omit<User, "id" | "email">>;
```

**Category**

```ts
export type CategoryType = "Income" | "Expenses";

export type Category = {
  id: string;
  name: string;
  type: CategoryType;
  userId: number;
  isDeleted?: boolean;
};
```

**Transaction**

```ts
export interface Transaction {
  id: string;
  date: string;
  categoryId: string;
  type: "Income" | "Expenses";
  description: string;
  amount: number;
  userId?: number;
}

export interface TransactionFormData {
  id?: string;
  date: string;
  categoryId: string;
  type: "Income" | "Expenses";
  description: string;
  amount: number;
  userId?: number;
}
```

**Widget**

```ts
export type WidgetCardType = "income" | "expenses" | "balance";

export interface WidgetCardData {
  id: string;
  title: string;
  amount: number;
  changePercent: number;
  cardType: WidgetCardType;
  iconId: string;
}
```

**Auth**

```ts
export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
}
```

---

## XII. Data Flow & Authorization

UI ↔ Zustand Stores ↔ Mock API ↔ Mock Data

- **UI:** forms, widgets, CRUD buttons

- **Stores:** methods create, update, delete

- **Mock API:** async calls, Zod validation

- **Demo login:** useAuthStore.initDemoUser()

---

## XIII. Demo Account Instructions

- Auto-login: demo@fintrack.com with preloaded data
- Force load: Home → profile dropdown (Topbar) → Log out → Log in as Demo
- Switch account: profile dropdown (Topbar) → Change account → demo2@email.com / demo123456
- Register new user: profile dropdown (Topbar) → Create new account → new personal data
