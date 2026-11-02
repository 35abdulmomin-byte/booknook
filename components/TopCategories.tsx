import Link from "next/link";
import { Baby, BookText, FlaskConical, Landmark, Library } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const categories = [
  { name: "Fiction", Icon: BookText, text: "Stories and novels" },
  { name: "Science", Icon: FlaskConical, text: "Facts and discoveries" },
  { name: "History", Icon: Landmark, text: "Look back in time" },
  { name: "Kids", Icon: Baby, text: "Fun for little readers" },
  { name: "Others", Icon: Library, text: "Everything else" },
];

export default function TopCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        title="Top Categories"
        subtitle="Pick a shelf that matches your mood and start exploring."
      />

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
        {categories.map(({ name, Icon, text }, index) => (
          <Reveal key={name} delay={index * 0.08} className="h-full">
            <Link
              href={`/books?category=${name}`}
              className="group flex h-full flex-col items-center rounded-2xl border bg-card p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-primary hover:shadow-lg"
            >
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="font-bold">{name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{text}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}