Disponible en: [English](README.en.md)

# Documentación Técnica de FinTrack

---

FinTrack Demo es una SPA para el seguimiento de finanzas personales con modo demo.  
El proyecto demuestra gráficos, tablas, filtros y formularios para agregar/editar datos. Completamente tipado, listo para desarrollo local y despliegue.

---

## I. Objetivo del Proyecto

- Mostrar arquitectura frontend moderna usando React + TypeScript
- Gestión de estado con Zustand
- Validación de formularios con Zod
- Visualización de datos con Recharts y Framer Motion
- Enrutamiento SPA mediante React Router
- Demostrar funcionalidad a través del modo demo

---

## II. Estructura del Proyecto

public/ # recursos estáticos (iconos, fuentes, imágenes)
src/
├─ app/ # inicialización, providers, routing, ErrorBoundary
├─ entities/ # entidades de negocio: transacciones, categorías, usuarios, widgets
├─ features/ # acciones de usuario (Agregar/Editar para transacciones y categorías)
├─ pages/ # páginas contenedor (Home, Overview, Login, Register, Profile, 404)
├─ shared/ # componentes reutilizables, hooks, utilidades, estilos, configs
└─ data/mock/# datos de demo: usuarios, transacciones, categorías

**Archivos de configuración:** `vite.config.ts`, `tsconfig.*.json`, `jest.config.ts`, `vercel.json`.

---

## III. Funcionalidad

### 1. Autenticación y Registro

- Páginas: `src/pages/login`, `src/pages/register`
- Store: `src/entities/auth/*` (Zustand store, mock API, modelos)
- UI: `src/shared/ui/Input`, `Button`
- Validación de formularios vía Zod
- Estado de autenticación almacenado en `authStore`
- Usuario demo validado mediante JSON mock

### 2. CRUD de Transacciones

- Páginas: `src/pages/transactions`
- Modales: `AddEditTransactionModal` (`src/features/transaction/...`)
- Store: `transactionStore`
- Formularios: tipo, categoría, monto, fecha, descripción (Zod)
- Actualización reactiva de la lista tras cambios
- Cambios persistidos en localStorage en modo demo

### 3. CRUD de Categorías

- Páginas: `src/pages/categories`
- Modales: `AddEditCategoryModal` (`src/features/category/...`)
- Store: `categoryStore`
- Esquema: nombre, tipo (Ingresos/Gastos), color
- Usadas como referencia para transacciones
- Persistidas en localStorage

### 4. Analítica y Widgets (Overview)

- Páginas: `src/pages/overview`
- Widgets: balance, ingresos, gastos, cantidad de transacciones
- Gráficos: por categorías, dinámica de ingresos/gastos (Recharts)
- Datos calculados en el cliente mediante Zustand stores

### 5. Home

- Página de bienvenida (`src/pages/home`)
- Contenido estático, sin lógica de negocio

### 6. Perfil de Usuario

- Página: `src/pages/profile`
- Mostrar y editar datos del usuario
- Estado mediante `userStore`

### 7. UI Compartida

- Componentes: Button, Input, Modal, Loader, Sidebar, Topbar, etc.
- Reutilizables y completamente tipados con TypeScript

### 8. Stores de Zustand

- Store separado por dominio (auth, transaction, category, user)
- Métodos: add, update, remove, setActive, reset
- Estado en memoria + localStorage
- Reactividad mediante hooks (`useTransactionStore`, `useCategoryStore`)

---

## IV. Arquitectura (FSD / Feature-Sliced Design)

### Capas principales

- **app/** — inicialización de la aplicación: punto de entrada (`index.tsx`), enrutamiento (`App.tsx`), providers, ErrorBoundary, estilos globales y tests.
- **entities/** — entidades de negocio y lógica central:
  - **user/**, **transaction/**, **category/**, **widget/**  
    Cada entidad contiene:
    - `model/` — tipos, API, store y pruebas unitarias
    - `ui/` — componentes visuales reutilizables (por ejemplo, filas de tablas)
  - **auth/** — entidad separada con validación de formularios y store
- **features/** — módulos funcionales para acciones de usuario:
  - Ejemplos: `AddEditTransaction`, `AddEditCategory`  
    Contienen componentes de UI para modales y pruebas
- **pages/** — páginas a nivel de contenedor:
  - `Home`, `Overview`, `Transactions`, `Categories`, `Profile`, `Login`, `Register`, `404`
  - Cada página se divide en:
    - `index.tsx` — lógica de la página, llama a features/entities
    - `ui/` — solo componentes visuales
- **shared/** — elementos y utilidades reutilizables:
  - Componentes UI (`Input`, `Button`, `Sidebar`, `Topbar`, modales, widgets)
  - hooks (`useWidgetsData`, `useNotificationsStore`, etc.)
  - utilidades (`lib/`)
  - estilos y variables globales
  - mocks, tests y configuraciones
- **data/mock/** — datos de demostración para desarrollo y presentación
- **assets/** — recursos estáticos: imágenes, íconos, fuentes

### Interacción de Capas

pages → features → entities → shared/api

- Las páginas usan bloques de features
- Features operan sobre entidades de negocio
- Shared accesible por todas las capas
- App provee providers globales e inicialización de datos

### Principios

- Aislamiento modular
- Reutilización de componentes
- Aliases: @/shared, @/entities, @/features
- Carga diferida de páginas (React.lazy + Suspense)
- Protección de rutas privadas

---

## V. Backend (Demo)

- Sin servidor real; usa mock API + Zustand + localStorage
- Operaciones asincrónicas ~200ms

### Datos Mock

- `demoUsers`: { id, email, password, firstName, lastName, avatar, location }
- `demoCategories`: { id, name, type, userId, isDeleted }
- `demoTransactions`: { id, userId, categoryId, amount, type, date, description }

### Mock API

- `authApi` — login, register, getCurrentUser
- `categoryApi` — CRUD categorías, soft delete
- `transactionApi` — CRUD transacciones
- `userApi` — get/update user
- Validación vía Zod

### Stores (Zustand)

- `useAuthStore`, `useUserStore`, `useCategoriesStore`, `useTransactionsStore`, `useWidgetsStore`
- Persistir mediante localStorage
- Filtrado por userId

### Hooks

- `useTransactionsWithCategoryNames` — transacciones con nombres de categorías, memoizadas

---

## VI. Tech Stack

- **Frontend:** React 19, Vite, TypeScript, SCSS
- **Animaciones:** Framer Motion
- **Routing:** React Router v7
- **Estado:** Zustand, persist
- **Validación:** Zod
- **Fechas:** date-fns, react-datepicker
- **Visualización de datos:** Recharts
- **Testing:** Jest, React Testing Library, ts-jest
- **Linting/Formateo:** ESLint, Prettier

---

## VII. Ejecutando el Proyecto

### Dev

```bash
npm install
npm run dev
```

### Build / Producción

```bash
npm run build
npm run preview
```

- Dev-server con HMR, TypeScript, JSX

- Build optimizado para SPA

- Aliases preservados en el build

---

## VIII. Testing

- Tests unitarios y snapshots para componentes, hooks, utilidades

- Verificación de operaciones CRUD, UI, stores, mocks

- Jest + React Testing Library + ts-jest

- Aislado de API real y localStorage

---

## IX. Aliases

| Alias     | Path          | Ejemplo                                                                                                        |
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

- React Router totalmente compatible con history

- Variables de entorno: VITE_BASENAME, VITE_API_URL, VITE_APP_NAME

- Demo completamente funcional con datos locales

---

## XI. Tipos de Entidades (TypeScript)

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

## XII. Flujo de Datos y Autorización

UI ↔ Zustand Stores ↔ Mock API ↔ Mock Data

- **UI:** formularios, widgets, botones CRUD

- **Stores:** métodos create, update, delete

- **Mock API:** llamadas asincrónicas, validación con Zod

- **Demo login:** useAuthStore.initDemoUser()

---

## XIII. Demo Account Instructions

- Auto-login: demo@fintrack.com con datos precargados
- Carga forzada: Home → profile dropdown (Topbar) → Log out → Log in as Demo
- Cambiar cuenta: profile dropdown (Topbar) → Change account → demo2@email.com / demo123456
- Registrar nuevo usuario: profile dropdown (Topbar) → Create new account → nuevos datos personales
