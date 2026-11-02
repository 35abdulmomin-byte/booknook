"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { Book } from "@/components/BookCard";
import { apiFetch } from "@/lib/api";
import { uploadImage } from "@/lib/imgbb";
import BookFields from "@/components/books/BookFields";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  book: Book;
  onClose: () => void;
  onSaved: (book: Book) => void;
};

export default function EditBookDialog({ book, onClose, onSaved }: Props) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const file = fd.get("image") as File;

    setLoading(true);
    try {
      const image = file && file.size > 0 ? await uploadImage(file) : book.image;
      const updated = await apiFetch<Book>(
        `/books/${book._id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            title: String(fd.get("title")).trim(),
            author: String(fd.get("author")).trim(),
            category: String(fd.get("category")),
            description: String(fd.get("description")).trim(),
            totalCopies: Number(fd.get("totalCopies")),
            image,
          }),
        },
        true
      );
      toast.success("Book updated successfully!");
      onSaved(updated);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update the book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogDescription>Change the details and save.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <BookFields book={book} />
          <Button type="submit" className="w-full rounded-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}