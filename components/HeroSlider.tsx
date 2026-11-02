"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { BookMarked, BookPlus, RotateCcw, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Slide = {
  title: string;
  text: string;
  gradient: string;
  Icon: LucideIcon;
  tag: string;
};

const slides: Slide[] = [
  {
    tag: "Share",
    title: "Add a Book, Share the Joy",
    text: "Got a book sitting on your shelf? List it on BookNook in a minute and let other readers enjoy it too.",
    gradient: "from-amber-900 via-orange-800 to-stone-900",
    Icon: BookPlus,
  },
  {
    tag: "Borrow",
    title: "Borrow Your Next Great Read",
    text: "Browse our growing collection, pick a title you love and borrow it for a few days with just one click.",
    gradient: "from-emerald-900 via-teal-800 to-stone-900",
    Icon: BookMarked,
  },
  {
    tag: "Return",
    title: "Finished Reading? Pass It On",
    text: "Return your book when you are done so the next reader can pick it up. Keep the stories moving.",
    gradient: "from-rose-900 via-red-800 to-stone-900",
    Icon: RotateCcw,
  },
];

export default function HeroSlider() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8"
    >
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={800}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="hero-swiper overflow-hidden rounded-3xl shadow-xl"
      >
        {slides.map(({ title, text, gradient, Icon, tag }) => (
          <SwiperSlide key={title}>
            <div
              className={`relative flex min-h-[420px] items-center bg-gradient-to-br ${gradient} px-6 py-16 text-white sm:px-12 md:min-h-[520px] lg:px-20`}
            >
              {/* decorative circles */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />
              <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-white/5" />

              <div className="relative z-10 grid w-full items-center gap-10 md:grid-cols-2">
                <div className="space-y-6">
                  <span className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1 text-sm font-medium tracking-wide">
                    {tag}
                  </span>
                  <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                    {title}
                  </h1>
                  <p className="max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
                    {text}
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-white px-8 text-stone-900 hover:bg-white/90"
                  >
                    <Link href="/books">Browse Books</Link>
                  </Button>
                </div>
                <div className="hidden justify-center md:flex">
                  <div className="flex h-56 w-56 items-center justify-center rounded-[2.5rem] border border-white/20 bg-white/10 shadow-2xl backdrop-blur-sm lg:h-72 lg:w-72">
                    <Icon className="h-28 w-28 lg:h-36 lg:w-36" strokeWidth={1.25} />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
}