import RecommendationOfTheDay from "./ui/recommendationOfTheDay";
import { RecommendationSkeleton } from "./ui/skeletons";
import { Suspense } from "react";
import Pictures from '@/app/ui/pictures/pictures';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <Suspense fallback={<RecommendationSkeleton />}>
        <RecommendationOfTheDay />
      </Suspense>

      <Pictures />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </main>
  );
}
