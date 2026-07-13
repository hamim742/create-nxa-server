# create-nxa-server 🚀

A modern CLI tool to bootstrap a new **Express + Prisma + MongoDB** backend server with TypeScript. Out-of-the-box support for database connections, robust global error handling, environment configs, and routing.

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

The generated backend project is structured as follows:

```text
my-server/
├── prisma/
│   └── schema.prisma      # Prisma schema (configured with MongoDB)
├── src/
│   ├── app/
│   │   ├── db/
│   │   │   └── connected.db.ts  # Database connection module
│   │   ├── error/
│   │   │   └── AppError.ts      # Custom error class
│   │   ├── lib/
│   │   │   └── prisma.ts        # Prisma client instantiation
│   │   ├── middleware/
│   │   │   ├── globalErrorHandler.ts # Formatted Zod & Prisma error responses
│   │   │   └── notFound.ts      # 404 Route handler
│   │   ├── routes/
│   │   │   └── index.ts         # Main router registry
│   │   └── utils/
│   │       ├── catchAsync.ts    # Async wrapper to eliminate try-catch boilerplate
│   │       └── sendResponse.ts  # Standardized API response format
│   ├── config/
│   │   └── index.ts       # Typed configurations using dotenv
│   ├── app.ts             # Express App setup & middleware configuration
│   └── server.ts          # Server entry point (Exception handling & port listener)
├── .env.example           # Environment variables template
├── tsconfig.json          # TypeScript configurations
└── package.json           # Scripts and dependencies
```

---

## ✨ Features

- **Express & TypeScript**: Strongly typed requests, responses, and middlewares.
- **Prisma & MongoDB**: Pre-configured MongoDB client connection.
- **Auto-Configured Middlewares**: Includes `cors`, `cookie-parser`, `helmet`, and JSON request body parser.
- **Standardized Error Handling**:
  - Automatically catches unhandled exceptions & promise rejections.
  - Formats Zod validation errors to display which fields failed validation.
  - Automatically extracts and formats Prisma unique constraint conflicts (e.g. duplicate email).
- **Graceful Shutdown**: Shuts down the HTTP listener and disconnects database connections on `SIGTERM` / `SIGINT` signals.

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
