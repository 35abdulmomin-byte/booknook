import { cache } from "react";
import type { Book } from "@/components/BookCard";

export const getBook = cache(async (id: string): Promise<Book | null> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404 || res.status === 400) return null;
  if (!res.ok) throw new Error("Could not load the book.");

  return await res.json();
});