"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Book = {
  _id: string;
  id?: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  addedBy?: {
    name?: string;
    email?: string;
  };
  createdAt?: string;
};

export default function BookCard({ book }: { book: Book }) {
  const router = useRouter();

  const bookId = book._id?.toString() || book.id || "";
  const unavailable = book.availableCopies < 1;

  const handleViewDetails = () => {
    if (!bookId) return;
    router.push(`/books/${bookId.trim()}`);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:shadow-md">
      <div
        onClick={handleViewDetails}
        className="relative h-60 w-full cursor-pointer overflow-hidden bg-muted"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.image}
          alt={book.title}
          className={`h-full w-full object-cover transition-transform duration-300 hover:scale-105 ${
            unavailable ? "opacity-60 grayscale" : ""
          }`}
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur-md">
          {book.category}
        </span>
        {unavailable && (
          <span className="absolute right-3 top-3 rounded-full bg-destructive px-3 py-1 text-xs font-semibold text-white">
            Unavailable
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3
          onClick={handleViewDetails}
          className="line-clamp-1 cursor-pointer text-xl font-bold transition-colors hover:text-primary"
        >
          {book.title}
        </h3>
        <p className="text-sm text-muted-foreground">by {book.author}</p>

        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {book.description}
        </p>

        <div className="mt-auto pt-4">
          <div className="mb-4 flex items-center justify-between text-xs font-medium">
            <span
              className={
                unavailable ? "text-destructive" : "text-muted-foreground"
              }
            >
              {unavailable
                ? `No copies left (0/${book.totalCopies})`
                : `Available: ${book.availableCopies}/${book.totalCopies}`}
            </span>
          </div>

          <Button
            onClick={handleViewDetails}
            className="w-full rounded-full"
            variant={unavailable ? "outline" : "default"}
          >
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}