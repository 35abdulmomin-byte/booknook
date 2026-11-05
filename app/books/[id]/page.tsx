"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { ArrowLeft, BookOpen, Tag, Copy, User, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

type Book = {
  _id: string;
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

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

export default function BookDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [borrowing, setBorrowing] = useState(false);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const fetchBook = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_URL}/books/${encodeURIComponent(id)}`, {
          method: "GET",
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(
            res.status === 404
              ? "Book not found."
              : "Failed to load book details."
          );
        }

        setBook(await res.json());
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchBook();
    return () => controller.abort();
  }, [id]);

  const handleBorrow = async () => {
    if (!book) return;

    if (!session?.user) {
      toast.info("Please login to borrow a book.");
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    setBorrowing(true);
    try {
      await apiFetch(
        "/borrows",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookId: book._id }),
        },
        true
      );

      toast.success("Book borrowed! Check My Borrows.");
      setBook((prev) =>
        prev ? { ...prev, availableCopies: prev.availableCopies - 1 } : prev
      );
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not borrow the book."
      );
    } finally {
      setBorrowing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="animate-pulse text-lg font-medium text-muted-foreground">
          Loading book details...
        </p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold text-red-500">
          Book not found or failed to load.
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          {error || "No book information available."}
        </p>
        <Link href="/books">
          <Button variant="outline" className="rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Books
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <Link
        href="/books"
        className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Books
      </Link>

      <div className="grid grid-cols-1 gap-8 rounded-3xl border bg-card p-6 shadow-sm md:grid-cols-3 md:p-8">
        <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-muted md:h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={book.image}
            alt={book.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between md:col-span-2">
          <div>
            <span className="mb-3 inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Tag className="h-3 w-3" />
              {book.category}
            </span>

            <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
              {book.title}
            </h1>

            <p className="mb-6 flex items-center gap-2 text-base font-medium text-muted-foreground">
              <User className="h-4 w-4" />
              By {book.author}
            </p>

            <div className="my-4 space-y-3 border-b border-t py-4">
              <h2 className="font-semibold">Description</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {book.description}
              </p>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Copy className="h-4 w-4 text-primary" />
                <span>
                  Available Copies:
                  <strong className="ml-1 text-foreground">
                    {book.availableCopies} / {book.totalCopies}
                  </strong>
                </span>
              </div>

              {book.addedBy?.name && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span>
                    Added by:
                    <strong className="ml-1 text-foreground">
                      {book.addedBy.name}
                    </strong>
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleBorrow}
              className="flex-1 rounded-full py-6 text-base font-medium"
              disabled={book.availableCopies < 1 || borrowing}
            >
              {borrowing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {borrowing
                ? "Borrowing..."
                : book.availableCopies > 0
                ? "Borrow Book"
                : "Out of Stock"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}