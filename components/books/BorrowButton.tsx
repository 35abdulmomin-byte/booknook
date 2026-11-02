"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = { bookId: string; bookTitle: string; available: number };

export default function BorrowButton({ bookId, bookTitle, available }: Props) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (available < 1) {
    return (
      <Button size="lg" className="rounded-full px-8" disabled>
        Not Available
      </Button>
    );
  }

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiFetch("/borrows", { method: "POST", body: JSON.stringify({ bookId }) }, true);
      toast.success("Book borrowed successfully! Return it within 7 days.");
      setOpen(false);
      router.push("/my-borrows");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not borrow this book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="rounded-full px-8">Borrow This Book</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Borrow &quot;{bookTitle}&quot;</DialogTitle>
          <DialogDescription>
            You can keep this book for 7 days. Confirm your details to continue.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleConfirm} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="borrowName">Name</Label>
            <Input id="borrowName" value={session?.user.name ?? ""} readOnly className="bg-muted" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="borrowEmail">Email</Label>
            <Input id="borrowEmail" value={session?.user.email ?? ""} readOnly className="bg-muted" />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full rounded-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm Borrow
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}