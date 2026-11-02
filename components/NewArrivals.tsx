import Link from "next/link";
import { BookX } from "lucide-react";
import BookCard, { type Book } from "@/components/BookCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

async function getLatestBooks(): Promise<Book[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books?limit=6`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export function NewArrivalsSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        title="New Arrivals"
        subtitle="Fresh additions to our shelves, picked up by readers like you."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border">
            <Skeleton className="h-64 w-full rounded-none" />
            <div className="space-y-3 p-5">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function NewArrivals() {
  const books = await getLatestBooks();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        title="New Arrivals"
        subtitle="Fresh additions to our shelves, picked up by readers like you."
      />

      {books.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed py-16 text-center">
          <BookX className="h-12 w-12 text-muted-foreground" />
          <p className="text-lg font-semibold">No books yet</p>
          <p className="text-sm text-muted-foreground">
            Be the first to add a book to the library.
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

      <Reveal className="mt-12 text-center">
        <Button asChild size="lg" className="rounded-full px-8">
          <Link href="/books">See All Books</Link>
        </Button>
      </Reveal>
    </section>
  );
}