# BookNook

A small online library where you can add a book, borrow a book and return a book.

**Live Site:** <your-live-site-url>

**Server Repository:** <your-server-repo-url>

## Features

- Browse all books in a responsive grid with search and category filter
- Add your own books with a cover image uploaded through imgbb
- Borrow and return books with live copy count and a "Not Available" state
- Double borrow protection: the same book cannot be borrowed twice at once
- Secure login with email and password or Google, powered by BetterAuth
- JWT protected API routes and private pages that survive a page reload
- Edit and delete your own books with a confirmation modal
- Dark and light theme, Swiper banner and smooth Framer Motion animations

## Tech Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, BetterAuth, MongoDB, Express.js, Swiper, Framer Motion

## Run Locally

1. Clone the repo and run `npm install`
2. Create a `.env.local` file with `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_IMGBB_KEY`
3. Run `npm run dev`