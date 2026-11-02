"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { uploadImage } from "@/lib/imgbb";
import BookFields from "@/components/books/BookFields";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddBookForm() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  if (isPending) return <Spinner />;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const file = fd.get("image") as File;

    if (!file || file.size === 0) {
      toast.error("Please choose a book image.");
      return;
    }
    setLoading(true);
    try {
      const image = await uploadImage(file);
      await apiFetch(
        "/books",
        {
          method: "POST",
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
      toast.success("Book added successfully!");
      router.push("/my-books");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add the book.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-5 rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
      <BookFields />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="userName">Your Name</Label>
          <Input id="userName" value={session?.user.name ?? ""} readOnly className="bg-muted" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="userEmail">Your Email</Label>
          <Input id="userEmail" value={session?.user.email ?? ""} readOnly className="bg-muted" />
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full rounded-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Add Book
      </Button>
    </form>
  );
}