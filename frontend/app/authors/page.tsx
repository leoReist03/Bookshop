import { Suspense } from 'react';
import { AuthorListSkeleton } from '../ui/skeletons';
import AuthorList from '../ui/authors/authorList';
import Search from '../ui/search';
import { CreateAuthor } from '../ui/authors/buttons';
import Pageheader from '../ui/pageheader';

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    }
}) {
    const query = searchParams?.query || ''
    const currentPage = Number(searchParams?.page) || 1;

    return (
        <div className="w-full text-center bg-panel dark:bg-panel-dark text-color dark:text-color-dark p-3 rounded-lg mb-5">
            <Pageheader text='Author List' />
            <div className='flex py-5'>
                <Search placeholder='Search Authors...' />
                <CreateAuthor />
            </div>
            <Suspense key={query + currentPage} fallback={<AuthorListSkeleton />}>
                <AuthorList query={query} currentPage={currentPage} />
            </Suspense>
        </div>
    );
}