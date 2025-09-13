# Vite + React + TypeScript App

This project is a React application bootstrapped with [Vite](https://vitejs.dev/) and written in [TypeScript](https://www.typescriptlang.org/).  
It provides a fast development experience with modern frontend tooling.

---

## �📦 Prerequisites
Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) **>= 18.x**  
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

---

## 🔧 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/pranavarora724/meatec-assignment.git
cd meatec-assignment

```

Install dependencies

```bash
# with npm
npm install

# or with yarn
yarn install

# or with pnpm
pnpm install
```

▶️ Running Locally

```bash
# with npm
npm run dev

# or with yarn
yarn dev

# or with pnpm
pnpm dev
```
Now open your browser and navigate to:

```bash
http://localhost:5173/
```

---

## � Project Structure

```
meatec/
├── public/
│   ├── mockServiceWorker.js
├── src/
│   ├── api.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── types.ts
│   ├── vite-env.d.ts
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Modal.tsx
│   │   ├── Navbar.tsx
│   │   ├── NonProtectedRoute.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── SingleTask.tsx
│   │   ├── ToggleTheme.tsx
│   │   └── forms/
│   │       ├── CreateTask.tsx
│   │       ├── DeleteTask.tsx
│   │       ├── LoginForm.tsx
│   │       └── UpdateTask.tsx
│   ├── hooks/
│   │   └── useTheme.ts
│   ├── mocks/
│   │   ├── browser.ts
│   │   └── handlers.ts
│   ├── pages/
│   │   ├── DashboardPage.tsx
│   │   ├── HomePage.tsx
│   │   └── LoginPage.tsx
│   ├── stores/
│   │   ├── AuthStore.ts
│   │   └── TaskStore.ts
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
```
