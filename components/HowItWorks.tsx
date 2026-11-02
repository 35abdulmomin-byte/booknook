import { BookMarked, RotateCcw, Search, UserPlus } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const steps = [
  {
    Icon: UserPlus,
    title: "Create an Account",
    text: "Register for free with your email or Google account in a few seconds.",
  },
  {
    Icon: Search,
    title: "Find a Book",
    text: "Browse the whole collection and open any book to see its full details.",
  },
  {
    Icon: BookMarked,
    title: "Borrow It",
    text: "Confirm your borrow with one click and enjoy the book for a few days.",
  },
  {
    Icon: RotateCcw,
    title: "Return It",
    text: "Done reading? Return the book so the next reader can pick it up.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          title="How Borrowing Works"
          subtitle="Four simple steps from sign up to the last page."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 0.1} className="h-full">
              <div className="relative flex h-full flex-col items-center rounded-2xl border bg-card p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <span className="absolute right-4 top-4 text-4xl font-black text-primary/15">
                  {index + 1}
                </span>
                <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
                  <Icon className="h-8 w-8" />
                </span>
                <h3 className="mb-2 text-lg font-bold">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}