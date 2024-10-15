import RecommendationOfTheDay from "./ui/recommendationOfTheDay";
import { RecommendationSkeleton } from "./ui/skeletons";
import { Suspense } from "react";
import Pictures from '@/app/ui/pictures/pictures';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <Suspense fallback={<RecommendationSkeleton />}>
        <RecommendationOfTheDay />
      </Suspense>

      <Pictures />
    </main>
  );
}
