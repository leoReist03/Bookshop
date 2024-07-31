import BookTable from "../ui/bookTable";
import { Suspense } from "react";
import { TableSkeleton } from "../ui/skeletons";
import PageHeader from "../ui/pageheader";
import Search from "../ui/search";
import { CreateBook } from "../ui/buttons";

export default async function Page() {
    return (
        <main>
            <PageHeader value={'Books Page'}/>

                <Suspense fallback={<TableSkeleton />}>
                    <div className="w-full text-center bg-icewhite p-3 rounded-lg mb-5">
                        <div className="flex items-center justify-between gap-2 mb-2">
                            <Search placeholder="Search Books..." />
                            <CreateBook />
                        </div>
                        <BookTable />
                    </div>
                </Suspense>
        </main>
    );
}