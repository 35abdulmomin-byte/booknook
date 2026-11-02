"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  BookMarked,
  BookPlus,
  CalendarDays,
  Library,
  LogOut,
  Mail,
} from "lucide-react";
import Spinner from "@/components/Spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { formatDate } from "@/lib/format";

type Stats = { books: number; borrows: number };

export default function ProfileView() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [stats, setStats] = useState<Stats | null>(null);

  const email = session?.user.email;

  useEffect(() => {
    if (!email) return;

    Promise.allSettled([
      apiFetch<unknown[]>(`/books?email=${encodeURIComponent(email)}`),
      apiFetch<unknown[]>("/borrows", {}, true),
    ]).then(([books, borrows]) => {
      setStats({
        books: books.status === "fulfilled" ? books.value.length : 0,
        borrows: borrows.status === "fulfilled" ? borrows.value.length : 0,
      });
    });
  }, [email]);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          router.push("/");
        },
        onError: () => toast.error("Logout failed. Please try again."),
      },
    });
  };

  if (isPending) return <Spinner label="Loading your profile..." />;
  if (!session) return null;

  const { user } = session;

  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl border bg-card shadow-sm">
      {/*banner */}
      <div className="h-32 bg-gradient-to-br from-amber-900 via-orange-800 to-stone-900" />

      <div className="px-6 pb-8 sm:px-10">
        {/*avatar*/}
        <div className="-mt-14 flex flex-col items-center text-center">
          <Avatar className="h-28 w-28 border-4 border-card shadow-lg">
            <AvatarImage
              src={user.image ?? undefined}
              alt={user.name ?? "User"}
              referrerPolicy="no-referrer"
            />
            <AvatarFallback className="bg-primary text-3xl font-bold text-primary-foreground">
              {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <h2 className="mt-4 text-2xl font-extrabold">{user.name}</h2>

          <div className="mt-3 flex flex-col items-center gap-2 text-sm text-muted-foreground sm:flex-row sm:gap-5">
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              {user.email}
            </span>
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              Member since {formatDate(new Date(user.createdAt).toISOString())}
            </span>
          </div>
        </div>

        {/* stats */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-secondary/60 p-5 text-center">
            <Library className="mx-auto h-6 w-6 text-primary" />
            {stats ? (
              <p className="mt-2 text-3xl font-extrabold">{stats.books}</p>
            ) : (
              <Skeleton className="mx-auto mt-2 h-9 w-12" />
            )}
            <p className="text-sm text-muted-foreground">Books Added</p>
          </div>
          <div className="rounded-2xl bg-secondary/60 p-5 text-center">
            <BookMarked className="mx-auto h-6 w-6 text-primary" />
            {stats ? (
              <p className="mt-2 text-3xl font-extrabold">{stats.borrows}</p>
            ) : (
              <Skeleton className="mx-auto mt-2 h-9 w-12" />
            )}
            <p className="text-sm text-muted-foreground">Books Borrowed</p>
          </div>
        </div>

        {/* actions */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/my-books">
              <Library className="mr-2 h-4 w-4" /> My Books
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/my-borrows">
              <BookMarked className="mr-2 h-4 w-4" /> My Borrows
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/add-book">
              <BookPlus className="mr-2 h-4 w-4" /> Add Book
            </Link>
          </Button>
        </div>

        <Button
          variant="destructive"
          className="mt-6 w-full rounded-full"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    </div>
  );
}