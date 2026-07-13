# create-nxa-server

A CLI tool to bootstrap a new Express + Prisma + MongoDB modern backend server.

## Usage

You can run the CLI tool directly using `npx`:

```bash
npx create-nxa-server <project-name>
```

Or install it globally:

```bash
npm install -g create-nxa-server
create-nxa-server <project-name>
```

## Generated Project Features

The generated backend project comes with the following preconfigured features:
- **Express & TypeScript**: Type-safe development setup with `ts-node-dev`.
- **Prisma & MongoDB**: Preconfigured database connectivity.
- **Robust Error Handling**: Dynamic global error handler supporting Zod validations and Prisma database constraint formatting.
- **Environment Configuration**: Safe environment variable loading using `dotenv`.
