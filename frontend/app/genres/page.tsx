import { Suspense } from 'react';
import { GenreListSkeleton } from '../ui/skeletons';
import GenreList from '../ui/genres/genreList';
import Search from '../ui/search';
import { CreateGenre } from "../ui/genres/buttons";
import Pageheader from '../ui/pageheader';

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    }
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    
    return (
        <div className="w-full text-center bg-icewhite p-3 rounded-lg mb-5">
            <Pageheader text='Genre List' />
            <div className="flex py-5">
                <Search placeholder="Search Genres..." />
                <CreateGenre />
            </div>
            <Suspense key={query + currentPage} fallback={<GenreListSkeleton />}>
                <GenreList query={query} currentPage={currentPage} />
            </Suspense>
        </div>
    );
}