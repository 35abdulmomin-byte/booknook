import type { Book } from "@/components/BookCard";
import { CATEGORIES, selectClass } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function BookFields({ book }: { book?: Book }) {
  // এই মুহূর্তে যতগুলো কপি ধার নেওয়া আছে (Edit-এর সময়)
  const borrowedNow = book ? book.totalCopies - book.availableCopies : 0;
  const minCopies = Math.max(1, borrowedNow);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Book Title</Label>
          <Input id="title" name="title" defaultValue={book?.title} placeholder="e.g. The Alchemist" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Author Name</Label>
          <Input id="author" name="author" defaultValue={book?.author} placeholder="e.g. Paulo Coelho" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <select id="category" name="category" defaultValue={book?.category ?? ""} required className={selectClass}>
            <option value="" disabled>Select a category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="totalCopies">Total Copies</Label>
          <Input
            id="totalCopies"
            name="totalCopies"
            type="number"
            min={minCopies}
            defaultValue={book?.totalCopies ?? 1}
            required
          />
          {book && borrowedNow > 0 && (
            <p className="text-xs text-muted-foreground">
              {borrowedNow} {borrowedNow === 1 ? "copy is" : "copies are"} currently borrowed, so total cannot be less than {minCopies}.
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Book Image</Label>
        <Input id="image" name="image" type="file" accept="image/*" required={!book} />
        {book && (
          <p className="text-xs text-muted-foreground">
            Leave empty to keep the current image.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Short Description</Label>
        <Textarea id="description" name="description" rows={4} defaultValue={book?.description} placeholder="Write a few lines about the book" required />
      </div>
    </>
  );
}