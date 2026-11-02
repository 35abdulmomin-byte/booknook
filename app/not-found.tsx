import Link from "next/link";
import { BookX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <BookX className="mb-6 h-20 w-20 text-primary" strokeWidth={1.25} />
      <h1 className="text-7xl font-extrabold text-primary">404</h1>
      <h2 className="mt-3 text-2xl font-bold">Page Not Found</h2>
      <p className="mt-2 text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button asChild size="lg" className="mt-8 rounded-full px-8">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}