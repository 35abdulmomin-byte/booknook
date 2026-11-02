import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
        <BookOpen className="h-5 w-5" />
      </span>
      <span className="text-2xl font-extrabold tracking-tight">
        Book<span className="text-primary">Nook</span>
      </span>
    </Link>
  );
}