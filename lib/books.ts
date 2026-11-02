import { cache } from "react";
import type { Book } from "@/components/BookCard";

export const getBook = cache(async (id: string): Promise<Book | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
});