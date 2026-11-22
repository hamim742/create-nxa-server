# create-nxa-server

A CLI tool that bootstraps a production-ready **Express + Prisma + MongoDB** backend in TypeScript. Generated projects include JWT authentication, user management, Zod request validation, centralized error handling, typed configuration, and a modular folder structure.

[![npm version](https://img.shields.io/npm/v/create-nxa-server.svg?style=flat-square)](https://www.npmjs.com/package/create-nxa-server)
[![npm downloads](https://img.shields.io/npm/dm/create-nxa-server.svg?style=flat-square)](https://www.npmjs.com/package/create-nxa-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

---

## Requirements

- Node.js 18.18 or later
- npm
- A MongoDB database (local or hosted, e.g. MongoDB Atlas)

---

## Quick Start

Create a new project:

```bash
npx create-nxa-server my-new-server
```

Or install the CLI globally:

```bash
npm install -g create-nxa-server
create-nxa-server my-new-server
```

The CLI will:

1. Copy the server template into a new directory
2. Create a `.env` file with `PROJECT_NAME` set to your project name
3. Initialize a Git repository with an initial commit
4. Install dependencies and generate the Prisma Client

Then start the server:

```bash
cd my-new-server
npm run dev
```

Open `http://localhost:5000` to view the server status page.

---

## Configuration

All settings are read from `.env` in the project root.

| Variable         | Default                   | Description                                         |
| :--------------- | :------------------------ | :-------------------------------------------------- |
| `PROJECT_NAME`   | Your project name         | Name shown on the status page and in server logs    |
| `PORT`           | `5000`                    | Port the HTTP server listens on                     |
| `DATABASE_URL`   | -                         | MongoDB connection string                           |
| `PASSWORD_SALT`  | `10`                      | bcrypt salt rounds for password hashing             |
| `JWT_SECRET`     | -                         | Secret used to sign JWT tokens (change this)        |
| `JWT_EXPIRES_IN` | `1d`                      | Access token lifetime                               |
| `NODE_ENV`       | `development`             | Runtime environment                                 |

---

## Features

### Server Status Page

`GET /` serves an animated status page that displays the project name, live server status and response time, uptime, environment, Node.js version, and the main API endpoints.

`GET /health` returns a JSON health check, suitable for uptime monitors and load balancers:

```json
{
  "success": true,
  "name": "my-new-server",
  "status": "ok",
  "uptime": 42.18,
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

### Authentication Module (`/api/v1/auth`)

| Method | Endpoint           | Access        | Description                                   |
| :----- | :----------------- | :------------ | :-------------------------------------------- |
| `POST` | `/register`        | Public        | Register a new user (password hashed with bcrypt) |
| `POST` | `/login`           | Public        | Authenticate and return a JWT                 |
| `POST` | `/change-password` | Authenticated | Change the current user's password            |
| `POST` | `/refresh-token`   | Public        | Issue a new access token                      |

### User Module (`/api/v1/user`)

| Method  | Endpoint      | Access        | Description                                            |
| :------ | :------------ | :------------ | :----------------------------------------------------- |
| `GET`   | `/me`         | Authenticated | Get the current user's profile                         |
| `PATCH` | `/me`         | Authenticated | Update the current user's profile                      |
| `GET`   | `/`           | Admin         | List all users                                         |
| `GET`   | `/:id`        | Admin         | Get a user by ID                                       |
| `PATCH` | `/:id/status` | Admin         | Update a user's status (`active` / `inactive` / `blocked`) or role |

### Built-in Infrastructure

- **Validation:** Zod schemas applied through a reusable `validateRequest` middleware
- **Error handling:** a global handler that formats Zod validation errors and Prisma errors (such as duplicate keys) into consistent JSON responses
- **Authorization:** JWT middleware with role-based access control (`user`, `admin`)
- **Responses:** a shared `sendResponse` helper for a uniform response shape
- **Stability:** handlers for uncaught exceptions and unhandled promise rejections

---

## Project Structure

```text
my-server/
├── prisma/
│   └── schema.prisma             # MongoDB schema with User model and enums
├── src/
│   ├── app/
│   │   ├── db/
│   │   │   └── connected.db.ts   # Database connection
│   │   ├── error/
│   │   │   └── AppError.ts       # Custom error class
│   │   ├── lib/
│   │   │   └── prisma.ts         # Prisma client instance
│   │   ├── middleware/
│   │   │   ├── auth.ts           # JWT authentication and role-based access
│   │   │   ├── validateRequest.ts# Zod request validation
│   │   │   ├── globalErrorHandler.ts
│   │   │   └── notFound.ts       # 404 handler
│   │   ├── modules/
│   │   │   ├── auth/             # Register, login, password, token
│   │   │   └── user/             # Profile and user management
│   │   ├── routes/
│   │   │   └── index.ts          # Route registry
│   │   ├── utils/
│   │   │   ├── catchAsync.ts     # Async error wrapper
│   │   │   └── sendResponse.ts   # Standard response format
│   │   └── views/
│   │       └── home.ts           # Server status page
│   ├── config/
│   │   └── index.ts              # Typed environment configuration
│   ├── types/
│   │   └── index.d.ts            # Express Request type extensions
│   ├── app.ts                    # Express app and middleware setup
│   └── server.ts                 # Entry point and process handlers
├── .env.example                  # Environment variable template
├── tsconfig.json
└── package.json
```

Each module follows the same layout: `*.routes.ts`, `*.controller.ts`, `*.service.ts`, `*.validation.ts`, and `*.interface.ts`. To add a module, create a folder under `src/app/modules/` and register its router in `src/app/routes/index.ts`.

---

## Scripts

| Command         | Description                                                  |
| :-------------- | :----------------------------------------------------------- |
| `npm run dev`   | Start the development server with live reload (`ts-node-dev`) |
| `npm run build` | Generate the Prisma Client and compile TypeScript to `dist/`  |
| `npm run start` | Run the compiled production server from `dist/server.js`      |

The Prisma Client is also generated automatically after `npm install`. After changing `prisma/schema.prisma`, run `npx prisma generate` (or `npm run build`) to regenerate it.

---

## Changelog

### 1.0.6

- Added an animated server status page at `/` that shows the project name
- Added the `GET /health` endpoint
- Added the `PROJECT_NAME` environment variable, set automatically by the CLI
- Removed malicious code introduced in 1.0.5. **Do not use 1.0.5.** If you generated a project with it, see the security note below.

### 1.0.4

- Added authentication and user modules

---

## Security Note for 1.0.5

Version 1.0.5 contained malicious code. Projects generated with it run remote code whenever `npm run dev`, `npm run build`, or `npm run start` is executed. If you used that version:

1. Delete the `init` file from the project root.
2. Remove `node init &&` from the `dev`, `build`, and `start` scripts in `package.json`.
3. Remove the `AUTH_API_KEY` block at the end of `src/app.ts` and the `AUTH_API_KEY` line from `.env`.
4. If any of those scripts were run, treat the machine as compromised and rotate passwords, API keys, and other credentials stored on it.

---

## License

Released under the [MIT License](https://opensource.org/licenses/MIT).
