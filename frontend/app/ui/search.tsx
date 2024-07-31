export default function Search({ placeholder }: { placeholder: string}) {
    return (
        <div className="relative flex flex-1 flex-shrink-0 self-end">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
            className="block pl-2 w-1/2 rounded-md border border-gray-200 text-xs text-cyan py-2 outline-0.5 placeholder:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-dark"
            placeholder={placeholder}
            />
            {/* <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
        </div>
    );
}