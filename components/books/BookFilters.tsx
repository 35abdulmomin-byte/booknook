"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BookFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const active = params.get("category") ?? "";
  const [search, setSearch] = useState(params.get("search") ?? "");

  const update = (next: { category?: string; search?: string }) => {
    const qs = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(next)) {
      if (value) qs.set(key, value);
      else qs.delete(key);
    }
    const query = qs.toString();
    router.push(query ? `/books?${query}` : "/books");
  };

  return (
    <div className="mb-10 space-y-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          update({ search: search.trim() });
        }}
        className="mx-auto flex max-w-xl gap-2"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or author"
            className="rounded-full pl-9"
          />
        </div>
        <Button type="submit" className="rounded-full px-6">Search</Button>
      </form>

      <div className="flex flex-wrap justify-center gap-2">
        {["", ...CATEGORIES].map((c) => (
          <Button
            key={c || "all"}
            type="button"
            size="sm"
            variant={active === c ? "default" : "outline"}
            className="rounded-full"
            onClick={() => update({ category: c })}
          >
            {c || "All"}
          </Button>
        ))}
      </div>
    </div>
  );
}