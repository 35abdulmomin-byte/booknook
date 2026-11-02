import type { Metadata } from "next";
import MyBorrows from "@/components/borrows/MyBorrows";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = { title: "My Borrows" };

export default function MyBorrowsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading title="My Borrows" subtitle="Books you have borrowed. Return them when you are done." />
      <MyBorrows />
    </div>
  );
}