import { Suspense } from "react";
import { BookListSkeleton } from "../ui/skeletons";
import Search from "../ui/search";
import { CreateBook } from "../ui/books/buttons";
import Pagination from "../ui/books/pagination";
import { fetchBooksPages } from "../lib/data/books";
import Pageheader from "../ui/pageheader";
import BookList from "../ui/books/bookList";

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?:string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchBooksPages(query);
    return (
        <main>
            <div className="w-full text-center bg-icewhite dark:bg-zinc-800 text-cyan dark:text-teal-400 px-4 py-5 rounded-lg mb-5">
                <Pageheader text="Book List" />
                <div className="flex items-center justify-between gap-2 my-4">
                    <Search placeholder="Search Books..." />
                    <CreateBook />
                </div>
                <div className="w-full text-center bg-icewhite-less rounded-lg mb-5">
                    <Suspense key={query + currentPage} fallback={<BookListSkeleton />}>
                        <BookList query={query} currentPage={currentPage} />
                    </Suspense>
                </div>
                <div>
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
        </main>
    );
}