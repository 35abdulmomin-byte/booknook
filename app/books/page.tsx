import type { Metadata } from "next";
import { Suspense } from "react";
import { BookX } from "lucide-react";
import BookCard, { type Book } from "@/components/BookCard";
import BookFilters from "@/components/books/BookFilters";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = { title: "All Books" };

type Props = {
  searchParams: Promise<{ category?: string; search?: string }>;
};

export default async function BooksPage({ searchParams }: Props) {
  const { category, search } = await searchParams;

  const qs = new URLSearchParams();
  if (category) qs.set("category", category);
  if (search) qs.set("search", search);

  let books: Book[] = [];
  let failed = false;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books?${qs}`, {
      cache: "no-store",
    });
    if (res.ok) books = await res.json();
    else failed = true;
  } catch {
    failed = true;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        title="All Books"
        subtitle="Explore the whole BookNook collection and find your next read."
      />

      <Suspense>
        <BookFilters />
      </Suspense>

      {books.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed py-16 text-center">
          <BookX className="h-12 w-12 text-muted-foreground" />
          <p className="text-lg font-semibold">
            {failed ? "Could not load books" : "No books found"}
          </p>
          <p className="text-sm text-muted-foreground">
            {failed
              ? "Please try again in a moment."
              : "Try a different search or category."}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book, i) => (
            <Reveal key={book._id} delay={(i % 3) * 0.1} className="h-full">
              <BookCard book={book} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}