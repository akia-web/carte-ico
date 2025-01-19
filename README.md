This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Setting up Prisma with Supabase

1. Install Prisma and the Prisma Client:
   ```bash
   npm install prisma @prisma.client
   ```

2. Initialize Prisma in your project:
   ```bash
   npx prisma init
   ```

3. Update your `.env` file with your Supabase database URL:
   ```env
   DATABASE_URL="your_supabase_database_url"
   DB_SUPA_API_KEY=your_subabase_key
   JWT_SECRET='your_jwt_secret'
   ```

4. Define your data models in `prisma/schema.prisma`.

5. Run the Prisma migration to create your database tables:
   ```bash
   npx prisma migrate dev --name init
   ```

6. Use Prisma Client in your application to interact with the database.

## Team


