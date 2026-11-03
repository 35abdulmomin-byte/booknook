import BookImage from "@/components/BookImage";
import { Button } from "@/components/ui/button";

export type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  addedBy: { name: string; email: string };
  createdAt: string;
};

export default function BookCard({ book }: { book: Book }) {
  const unavailable = book.availableCopies < 1;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-64 w-full overflow-hidden bg-muted">
        <BookImage
          src={book.image}
          alt={book.title}
          className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${
            unavailable ? "opacity-60 grayscale" : ""
          }`}
        />
        <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow">
          {book.category}
        </span>
        {unavailable && (
          <span className="absolute right-3 top-3 rounded-full bg-destructive px-3 py-1 text-xs font-semibold text-white shadow">
            Not Available
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-5">
        <h3 className="line-clamp-1 text-lg font-bold">{book.title}</h3>
        <p className="line-clamp-1 text-sm text-muted-foreground">
          by {book.author}
        </p>

        <Button asChild className="mt-auto w-full rounded-full">
          {/* পুরো পেজ নতুন করে লোড হবে, তাই সব ব্রাউজারে ঠিকমতো কাজ করবে */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href={`/books/${book._id}`}>View Details</a>
        </Button>
      </div>
    </article>
  );
}