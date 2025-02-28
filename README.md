# paloma

> Demonstration of a chatbot built using Next.js and the AI SDK by Vercel.

I really liked the general theme of [zed.dev](https://zed.dev/), so as a side project I prototyped a chatbot with a similar theme.

## Features

I did my best to include building blocks into this template while keeping things minimal so you can add/or remove things as you desire.

- Next.js 15 (React + TypeScript)
- OpenAI API via Vercel AI SDK
- Tailwind CSS + shadcn/ui
- PostgreSQL + Drizzle ORM
- Self-hosted credentials authentication
- Type safe environment variables
- Object validation with Zod
- Prettier + ESLint

## Getting Started

There aren't many _mandatory_ prerequisites other than **npm** and an OpenAI API key. You will also need an Upstash Redis database if you plan on using the existing rate limiting logic.

1. Download, fork, or template this repository.
2. Download dependencies via `npm i`.
3. Create and populate a `.env.local` file based off of `.env.example`.
4. Push the database schema to your database via `npm run db:push`.
5. Start a local development server via `npm run dev`.

If at any point you want to view/manage the contents of your database, you can do easily through Drizzle Studio via `npm run db:studio`.

## License

Licensed under the [MIT License](LICENSE), Copyright © 2024
