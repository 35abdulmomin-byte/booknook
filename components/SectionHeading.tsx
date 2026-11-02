import Reveal from "@/components/Reveal";

type Props = {
  title: string;
  subtitle: string;
};

export default function SectionHeading({ title, subtitle }: Props) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary" />
      <p className="mt-4 text-muted-foreground">{subtitle}</p>
    </Reveal>
  );
}