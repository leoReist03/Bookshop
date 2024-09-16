import { createBook } from "@/app/lib/actions/books";
import { CloudArrowUpIcon, UserIcon, NumberedListIcon, CalendarDaysIcon, IdentificationIcon, PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { fetchAuthors } from "@/app/lib/data/authors";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { fetchGenres } from "@/app/lib/data/genres";
import AdvancedSelect from "./advancedSelect";

export default async function Form() {
    const authors = await fetchAuthors('', 0);
    const genres = await fetchGenres('', 0);

    return (
        <form action={createBook} className="mt-6">
            <div className="flex flex-row">
                <div className="basis-1/4">
                    <div className="m-2 bg-cyan-light dark:bg-zinc-900 hover:bg-cyan-less rounded-md p-2 hover:cursor-pointer">
                        <label htmlFor="cover">
                            <p className="mb-2 block text-base font-medium text-left w-fit">
                                Cover:
                            </p>
                            <div className="relative mt-2 rounded-md">
                                <Image
                                    src={`/books/defaultBookCover.jpg`}
                                    alt={`default book cover`}
                                    width={140}
                                    height={120}
                                    className="rounded-md border mx-auto hover:brightness-95"
                                />
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <CloudArrowUpIcon className="w-8 h-8 mb-4" />
                                    <p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs">PNG or JPG(MAX.800x400px)</p>
                                </div>
                                <input id="cover" name="cover" type="file" className="hidden" />
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
                                className="py-3 px-4 pl-10 block w-3/4 border-gray-200 rounded-lg text-sm focus:border-cyan focus:ring-cyan dark:bg-zinc-900 dark:border-zinc-700 dark:focus:ring-zinc-600 dark:placeholder-teal-600"
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
                                className="py-3 px-4 pl-10 block w-3/4 border-gray-200 rounded-lg text-sm focus:cyan focus:ring-cyan disabled:opacity-50 disabled:pointer-events-none dark:bg-zinc-900 dark:border-zinc-700 dark:focus:ring-zinc-600 dark:placeholder-teal-600"
                            />
                            <IdentificationIcon className="pointer-events-none absolute left-3 top-[23px] h-[18px] w-[18px] -translate-y-1/2" />
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
                                min="1"
                                required
                                className="py-3 px-4 pl-10 block w-3/4 border-gray-200 rounded-lg text-sm focus:border-cyan focus:ring-cyan dark:bg-zinc-900 dark:border-zinc-700 dark:focus:ring-zinc-600 dark:placeholder-teal-600"
                            />
                            <NumberedListIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
                        </div>
                    </div>
                    <div className="m-2">
                        <label htmlFor="releaseDate" className="mb-2 block text-base font-medium text-left w-fit">
                            Release:
                        </label>
                        <div className="relative mt-2 rounded-md w-full">
                            <input
                                id="releaseDate"
                                name="releaseDate"
                                placeholder="Release..."
                                type="date"
                                className="py-3 px-4 pl-10 block w-3/4 border-gray-200 rounded-lg text-sm focus:border-cyan focus:ring-cyan dark:bg-zinc-900 dark:border-zinc-700 dark:focus:ring-zinc-600 dark:placeholder-cyan-less"
                            />
                            <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
                        </div>
                    </div>
                    <div className="m-2">
                        <label htmlFor="authorId" className="mb-2 block text-base font-medium text-left w-fit outline-2">
                            Authors:
                        </label>
                        <div className="w-3/4">
                            <AdvancedSelect name="authorId" group={authors} groupName="Author" />
                        </div>
                    </div>
                    <div className="m-2">
                        <label htmlFor="genreId" className="mb-2 block text-base font-medium text-left w-fit outline-2">
                            Genres:
                        </label>
                        <div className="w-3/4">
                            <AdvancedSelect name="genreId" group={genres} groupName="Genre" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-12 mr-8 flex justify-end gap-4">
                <Link
                    href="/books"
                    className="flex h-10 items-center rounded-lg px-4 text-base font-medium hover:text-cyan-dark dark:hover:text-teal-700 transition-colors"
                >
                    Cancel
                </Link>
                <Button type="submit">Create Book</Button>
            </div>
        </form>
    );
}