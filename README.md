# create-nxa-server 🚀

A modern CLI tool to bootstrap a new **Express + Prisma + MongoDB** backend server with TypeScript. Comes out-of-the-box with **JWT Authentication**, **User Management**, database connections, robust error handling, Zod validation, environment configs, and clean modular routing.

[![npm version](https://img.shields.io/npm/v/create-nxa-server.svg?style=flat-square)](https://www.npmjs.com/package/create-nxa-server)
[![npm downloads](https://img.shields.io/npm/dm/create-nxa-server.svg?style=flat-square)](https://www.npmjs.com/package/create-nxa-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

---

## ⚡ Quick Start

Create a new server project instantly by running:

```bash
npx create-nxa-server my-new-server
```

Or install it globally and run it:

```bash
npm install -g create-nxa-server
create-nxa-server my-new-server
```

---

## 📂 Generated Project Structure

The generated backend project follows a clean modular architecture:

```text
my-server/
├── prisma/
│   └── schema.prisma      # Prisma schema (MongoDB configured with User model & Enums)
├── src/
│   ├── app/
│   │   ├── db/
│   │   │   └── connected.db.ts  # Database connection module
│   │   ├── error/
│   │   │   └── AppError.ts      # Custom error class
│   │   ├── lib/
│   │   │   └── prisma.ts        # Prisma client instantiation
│   │   ├── middleware/
│   │   │   ├── auth.ts          # JWT Authentication & Role-Based Access Control (RBAC)
│   │   │   ├── validateRequest.ts # Zod Schema validation middleware
│   │   │   ├── globalErrorHandler.ts # Formatted Zod & Prisma error responses
│   │   │   └── notFound.ts      # 404 Route handler
│   │   ├── modules/
│   │   │   ├── auth/            # Authentication module (Register, Login, Password, Token)
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.interface.ts
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── auth.validation.ts
│   │   │   └── user/            # User Profile & User Management module
│   │   │       ├── user.controller.ts
│   │   │       ├── user.interface.ts
│   │   │       ├── user.routes.ts
│   │   │       ├── user.service.ts
│   │   │       └── user.validation.ts
│   │   ├── routes/
│   │   │   └── index.ts         # Main router registry
│   │   └── utils/
│   │       ├── catchAsync.ts    # Async wrapper to eliminate try-catch boilerplate
│   │       └── sendResponse.ts  # Standardized API response format
│   ├── config/
│   │   └── index.ts       # Typed configurations using dotenv
│   ├── types/
│   │   └── index.d.ts     # Express Request type extensions
│   ├── app.ts             # Express App setup & middleware configuration
│   └── server.ts          # Server entry point (Exception handling & port listener)
├── .env.example           # Environment variables template
├── tsconfig.json          # TypeScript configurations
└── package.json           # Scripts and dependencies
```

---

## ✨ Pre-Built Features & Endpoints

### 🔐 Authentication Module (`/api/v1/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Public | Register a new user with hashed password (bcrypt) |
| `POST` | `/login` | Public | Authenticate user & return JWT token |
| `POST` | `/change-password` | Authenticated | Change logged-in user password |
| `POST` | `/refresh-token` | Public | Generate a new access token |

### 👤 User Module (`/api/v1/user`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/me` | Authenticated | Get logged-in user profile |
| `PATCH` | `/me` | Authenticated | Update logged-in user profile |
| `GET` | `/` | Admin | Get list of all users |
| `GET` | `/:id` | Admin | Get user details by ID |
| `PATCH` | `/:id/status` | Admin | Update user status (`active`/`inactive`/`blocked`) or role |

---

## 🛠️ Generated Scripts

Inside the generated project directory, you can run:

#### `npm run dev`
Starts the development server with live reload (`ts-node-dev`) and automatically generates the Prisma Client if any schema changes occur.

#### `npm run build`
Compiles TypeScript into production-ready JavaScript inside the `dist/` directory.

#### `npm run start`
Starts the production server by executing `node dist/server.js`.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
