import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AddedBy from "@/components/books/AddedBy";
import BorrowButton from "@/components/books/BorrowButton";
import Spinner from "@/components/Spinner";
import { getBook } from "@/lib/books";
import { formatDate } from "@/lib/format";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const book = await getBook(id);
  return { title: book ? book.title : "Book Not Found" };
}

async function BookDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = await getBook(id);
  if (!book) notFound();

  return (
    <div className="grid gap-10 overflow-hidden rounded-3xl border bg-card p-6 shadow-sm md:grid-cols-2 md:p-8">
      <div className="h-[26rem] overflow-hidden rounded-2xl bg-muted">
        {/*eslint-disable-next-line @next/next/no-img-element*/}
        <img src={book.image} alt={book.title} className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-col gap-4">
        <span className="w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
          {book.category}
        </span>
        <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">{book.title}</h1>
        <p className="text-lg text-muted-foreground">by {book.author}</p>

        <p className="leading-relaxed">{book.description}</p>

        <dl className="grid grid-cols-2 gap-4 rounded-2xl bg-secondary/60 p-4 text-sm">
          <div>
            <dt className="text-muted-foreground">Added by</dt>
            <AddedBy name={book.addedBy?.name} email={book.addedBy?.email} />
          </div>
          <div>
            <dt className="text-muted-foreground">Added on</dt>
            <dd className="font-semibold">{formatDate(book.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Available copies</dt>
            <dd className="font-semibold">
              {book.availableCopies} of {book.totalCopies}
            </dd>
          </div>
        </dl>

        <div className="mt-auto pt-2">
          <BorrowButton bookId={book._id} bookTitle={book.title} available={book.availableCopies} />
        </div>
      </div>
    </div>
  );
}

export default function BookDetailsPage({ params }: Props) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="py-20 text-center"><Spinner label="Loading book details..." /></div>}>
        <BookDetails params={params} />
      </Suspense>
    </div>
  );
}