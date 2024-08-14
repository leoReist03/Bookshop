import BookTable from "../ui/books/bookTable";
import { Suspense } from "react";
import { TableSkeleton } from "../ui/skeletons";
import PageHeader from "../ui/pageheader";
import Search from "../ui/books/search";
import { CreateBook } from "../ui/books/buttons";
import Pagination from "../ui/books/pagination";
import { fetchBooksPages } from "../lib/data";

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
            <PageHeader value={'Books Page'}/>

                <Suspense key={query + currentPage} fallback={<TableSkeleton />}>
                    <div className="w-full text-center bg-icewhite p-3 rounded-lg mb-5">
                        <div className="flex items-center justify-between gap-2 mb-2">
                            <Search placeholder="Search Books..." />
                            <CreateBook />
                        </div>
                        <BookTable query={query} currentPage={currentPage} />
                        <div>
                            <Pagination totalPages={totalPages} />
                        </div>
                    </div>
                </Suspense>
        </main>
    );
}