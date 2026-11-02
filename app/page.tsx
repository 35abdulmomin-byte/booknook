import { Suspense } from "react";
import HeroSlider from "@/components/HeroSlider";
import NewArrivals, { NewArrivalsSkeleton } from "@/components/NewArrivals";
import HowItWorks from "@/components/HowItWorks";
import TopCategories from "@/components/TopCategories";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <Suspense fallback={<NewArrivalsSkeleton />}>
        <NewArrivals />
      </Suspense>
      <HowItWorks />
      <TopCategories />
    </>
  );
}