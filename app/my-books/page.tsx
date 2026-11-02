import type { Metadata } from "next";
import MyBooks from "@/components/books/MyBooks";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = { title: "My Books" };

export default function MyBooksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading title="My Books" subtitle="Manage the books you have added to BookNook." />
      <MyBooks />
    </div>
  );
}