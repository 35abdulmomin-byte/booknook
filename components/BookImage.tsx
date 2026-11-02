"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";

type Props = { src: string; alt: string; className?: string };

export default function BookImage({ src, alt, className }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-secondary p-4 text-center text-muted-foreground">
        <BookOpen className="h-10 w-10 text-primary" />
        <span className="line-clamp-3 text-sm font-semibold">{alt}</span>
      </div>
    );
  }

  return (
    //eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />
  );
}