"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BookMarked, Loader2 } from "lucide-react";
import Spinner from "@/components/Spinner";
import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Borrow = {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  borrowDate: string;
  returnDate: string;
};

export default function MyBorrows() {
  const [borrows, setBorrows] = useState<Borrow[] | null>(null);
  const [returningId, setReturningId] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<Borrow[]>("/borrows", {}, true)
      .then(setBorrows)
      .catch((err) => {
        toast.error(err instanceof Error ? err.message : "Could not load your borrows.");
        setBorrows([]);
      });
  }, []);

  const handleReturn = async (id: string) => {
    setReturningId(id);
    try {
      await apiFetch(`/borrows/${id}`, { method: "DELETE" }, true);
      setBorrows((prev) => prev?.filter((b) => b._id !== id) ?? []);
      toast.success("Book returned successfully. Thank you!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not return the book.");
    } finally {
      setReturningId(null);
    }
  };

  if (borrows === null) return <Spinner label="Loading your borrows..." />;

  if (borrows.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed py-16 text-center">
        <BookMarked className="h-12 w-12 text-muted-foreground" />
        <p className="text-lg font-semibold">You have not borrowed any books yet</p>
        <Button asChild className="rounded-full px-8">
          <Link href="/books">Browse Books</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Borrow Date</TableHead>
            <TableHead>Return Date</TableHead>
            <TableHead className="pr-4 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {borrows.map((b) => (
            <TableRow key={b._id}>
              <TableCell className="pl-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.bookImage} alt={b.bookTitle} className="h-16 w-12 rounded object-cover" />
              </TableCell>
              <TableCell className="font-semibold">{b.bookTitle}</TableCell>
              <TableCell>{formatDate(b.borrowDate)}</TableCell>
              <TableCell>{formatDate(b.returnDate)}</TableCell>
              <TableCell className="pr-4 text-right">
                <Button
                  size="sm"
                  className="rounded-full"
                  disabled={returningId === b._id}
                  onClick={() => handleReturn(b._id)}
                >
                  {returningId === b._id && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
                  Return Book
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}