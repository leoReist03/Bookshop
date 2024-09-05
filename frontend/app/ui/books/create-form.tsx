import { createBook } from "@/app/lib/actions/books";
import { CloudArrowUpIcon, UserIcon, NumberedListIcon, CalendarDaysIcon, IdentificationIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { fetchAuthors } from "@/app/lib/data/authors";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { fetchGenres } from "@/app/lib/data/genres";

export default async function Form() {
    const authors = await fetchAuthors('', 0);
    const genres = await fetchGenres('', 0);

    return (
        <form action={createBook} className="mt-6 text-cyan-dark">
            <div className="flex flex-row">
                <div className="basis-1/4">
                    <div className="m-2 bg-cyan-light hover:bg-cyan-less rounded-md p-2 hover:cursor-pointer">
                        <label htmlFor="cover">
                            <p className="mb-2 block text-base font-medium text-left w-fit">
                                Cover:
                            </p>
                            <div className="relative mt-2 rounded-md">
                                <Image
                                    src={`/books/defaultBookCover.jpg`}
                                    alt={`default book picture`}
                                    width={140}
                                    height={120}
                                    className="rounded-md border mx-auto hover:brightness-95"
                                />
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <CloudArrowUpIcon className="w-8 h-8 mb-4" />
                                    <p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs">PNG or JPG(MAX.800x400px)</p>
                                </div>
                                <input id="cover" name="picture" type="file" className="hidden" />
                            </div>
                        </label>
                    </div>
                </div>
                <div className="basis-3/4">
                    <div className="m-2">
                        <label htmlFor="name" className="mb-2 block text-base font-medium text-left w-fit">
                            Name:
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Name..."
                                className="peer block w-3/4 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-cyan-dark"
                            />
                            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
                        </div>
                    </div>
                    <div className="m-2">
                        <label htmlFor="description" className="mb-2 block text-base font-medium text-left w-fit">
                            Description:
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Description..."
                                className="peer block w-3/4 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-cyan-dark"
                            />
                            <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
                        </div>
                    </div>
                    <div className="m-2">
                        <label htmlFor="pages" className="mb-2 block text-base font-medium text-left w-fit">
                            Pages:
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <input
                                id="pages"
                                name="pages"
                                placeholder="Pages..."
                                type="number"
                                className="peer block w-3/4 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-cyan-dark"
                            />
                            <NumberedListIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
                        </div>
                    </div>
                    <div className="m-2">
                        <label htmlFor="release" className="mb-2 block text-base font-medium text-left w-fit">
                            Release:
                        </label>
                        <div className="relative mt-2 rounded-md w-full">
                            <input
                                id="release"
                                name="release"
                                placeholder="Release..."
                                type="date"
                                className="peer block w-3/4 rounded-md border border-gray-200 py-2 pl-10 pr-4 text-sm outline-2"
                            />
                            <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
                        </div>
                    </div>
                    <div className="m-2">
                        <label htmlFor="author" className="mb-2 block text-base font-medium text-left w-fit outline-2">
                            Authors:
                        </label>
                        <div className="relative mt-2 rounded-md bg-white h-10 border border-gray-200 content-center w-3/4 pl-9 pr-4">
                            <select
                                id="author"
                                name="author"
                                className="w-full">
                                <option value="none" selected disabled hidden>Select an Author</option>
                                {authors.map((author) => {
                                    return (
                                        <option 
                                            value={author.Id}
                                            key={author.Name}>
                                                {author.Name}
                                        </option>
                                    );
                                })}
                            </select>
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
                        </div>
                    </div>
                    <div className="m-2">
                        <label htmlFor="author" className="mb-2 block text-base font-medium text-left w-fit outline-2">
                            Genres:
                        </label>
                        <div className="relative mt-2 rounded-md bg-white h-10 border border-gray-200 content-center w-3/4 pl-9 pr-4">
                            <select
                                id="genre"
                                name="genre"
                                className="w-full">
                                <option value="none" selected disabled hidden>Select a Genre</option>
                                {genres.map((genre) => {
                                    return (
                                        <option 
                                            value={genre.Id}
                                            key={genre.Name}>
                                                {genre.Name}
                                        </option>
                                    );
                                })}
                            </select>
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-12 mr-8 flex justify-end gap-4">
                <Link
                    href="/books"
                    className="flex h-10 items-center rounded-lg px-4 text-base font-medium text-cyan hover:text-cyan-dark transition-colors"
                >
                    Cancel
                </Link>
                <Button type="submit">Create Book</Button>
            </div>
        </form>
    );
}