"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BookPlus, Pencil, Trash2 } from "lucide-react";
import type { Book } from "@/components/BookCard";
import EditBookDialog from "@/components/books/EditBookDialog";
import Spinner from "@/components/Spinner";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function MyBooks() {
  const { data: session } = authClient.useSession();
  const email = session?.user.email;

  const [books, setBooks] = useState<Book[] | null>(null);
  const [editing, setEditing] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState<Book | null>(null);

  useEffect(() => {
    if (!email) return;
    apiFetch<Book[]>(`/books?email=${encodeURIComponent(email)}`)
      .then(setBooks)
      .catch((err) => {
        toast.error(err instanceof Error ? err.message : "Could not load your books.");
        setBooks([]);
      });
  }, [email]);

  const confirmDelete = async () => {
    if (!deleting) return;
    const target = deleting;
    try {
      await apiFetch(`/books/${target._id}`, { method: "DELETE" }, true);
      setBooks((prev) => prev?.filter((b) => b._id !== target._id) ?? []);
      toast.success("Book deleted successfully.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete the book.");
    }
    setDeleting(null);
  };

  if (books === null) return <Spinner label="Loading your books..." />;

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed py-16 text-center">
        <BookPlus className="h-12 w-12 text-muted-foreground" />
        <p className="text-lg font-semibold">You have not added any books yet</p>
        <Button asChild className="rounded-full px-8">
          <Link href="/add-book">Add Book</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Book</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead className="pr-4 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book._id}>
                <TableCell className="pl-4">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={book.image} alt={book.title} className="h-16 w-12 rounded object-cover" />
                    <div>
                      <p className="font-semibold">{book.title}</p>
                      <p className="text-xs text-muted-foreground">{book.author}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>
                  {book.availableCopies} / {book.totalCopies}
                </TableCell>
                <TableCell className="pr-4">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" className="rounded-full" onClick={() => setEditing(book)}>
                      <Pencil className="mr-1 h-4 w-4" /> Edit
                    </Button>
                    <Button size="sm" variant="destructive" className="rounded-full" onClick={() => setDeleting(book)}>
                      <Trash2 className="mr-1 h-4 w-4" /> Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editing && (
        <EditBookDialog
          key={editing._id}
          book={editing}
          onClose={() => setEditing(null)}
          onSaved={(updated) => {
            setBooks((prev) => prev?.map((b) => (b._id === updated._id ? updated : b)) ?? []);
            setEditing(null);
          }}
        />
      )}

      <AlertDialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this book?</AlertDialogTitle>
            <AlertDialogDescription>
              &quot;{deleting?.title}&quot; will be removed permanently. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}