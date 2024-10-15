'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ onSearch, placeholder }: { onSearch: (value: string) => void, placeholder: string }) {
    //Pass the search term upwards
    const handleSearch = useDebouncedCallback((term) => {
        onSearch(term);
    }, 300);

    return (
        <div className="relative w-2/5 mb-3">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="peer block pl-9 w-full rounded-md border bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700 text-base py-2 outline-0.5 placeholder:text-cyan dark:placeholder:text-teal-600 focus:ring-0"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
        </div>
    );
}