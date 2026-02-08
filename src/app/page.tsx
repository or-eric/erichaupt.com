import { Suspense } from "react";
import Hero from "@/components/Hero";
import ThreePillars from "@/components/ThreePillars";
import SundayMusingsPreview from "@/components/SundayMusingsPreview";
import SundayMusingsSkeleton from "@/components/SundayMusingsSkeleton";
import TheLab from "@/components/TheLab";

export default function Home() {
  return (
    <main>
      <Hero />
      <ThreePillars />
      <Suspense fallback={<SundayMusingsSkeleton />}>
        <SundayMusingsPreview />
      </Suspense>
      <TheLab />
    </main>
  );
}
