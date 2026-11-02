import type { Metadata } from "next";
import AddBookForm from "@/components/books/AddBookForm";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = { title: "Add Book" };

export default function AddBookPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading title="Add a New Book" subtitle="Share a book with the BookNook community." />
      <AddBookForm />
    </div>
  );
}