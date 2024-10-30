import { updateBook } from "@/app/lib/actions/books";
import { Book } from "@/app/lib/models";
import { CloudArrowUpIcon, UserIcon, NumberedListIcon, CalendarDaysIcon, IdentificationIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { fetchAuthors } from "@/app/lib/data/authors";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { fetchGenres } from "@/app/lib/data/genres";
import AdvancedSelect from "./advancedSelect";
import FormInput from "../form-input";

export default async function Form({
    book
}: {
    book: Book;
}) {
    const authors = await fetchAuthors('', 0);
    const genres = await fetchGenres('', 0);

    const updateBookWithId = updateBook.bind(null, book.Id);

    return (
        <form action={updateBookWithId} className="mt-6">
            <div className="flex flex-row">
                <div className="basis-1/4">
                    <div className="m-2 bg-cyan-light dark:bg-zinc-900 hover:bg-cyan-less rounded-md p-2 hover:cursor-pointer">
                        <label htmlFor="cover">
                            <p className="mb-2 block text-base font-medium text-left w-fit">
                                Cover:
                            </p>
                            <div className="relative mt-2 rounded-md">
                                <Image
                                    src={book.Cover}
                                    alt={`cover of ${book.Name}`}
                                    width={140}
                                    height={120}
                                    className="rounded-md border dark:border-zinc-600 mx-auto hover:brightness-95"
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
                        <FormInput
                            label="name"
                            Icon={UserIcon}
                            type="text"
                            defaultValue={book.Name}
                        />
                    </div>
                    <div className="m-2">
                        <FormInput
                            label="description"
                            Icon={IdentificationIcon}
                            as="textarea"
                            defaultValue={book.Description}
                            rows={5}
                        />
                    </div>
                    <div className="m-2">
                        <FormInput
                            label="pages"
                            Icon={NumberedListIcon}
                            type="number"
                            min={1}
                            required
                            defaultValue={book.Pages}
                        />
                    </div>
                    <div className="m-2">
                        <FormInput
                            label="releaseDate"
                            Icon={CalendarDaysIcon}
                            type="date"
                            defaultValue={book.ReleaseDate.toString()}
                        />
                    </div>
                    <div className="m-2">
                        <AdvancedSelect label="authorId" group={authors} groupName="Author" />
                    </div>
                    <div className="m-2">
                        <AdvancedSelect label="genreId" group={genres} groupName="Genre" />
                    </div>
                </div>
            </div>
            <div className="mt-12 mr-8 flex justify-end gap-4">
                <Link
                    href="/books"
                    className="flex h-10 items-center rounded-lg px-4 text-base font-medium text-color hover:text-color-hover dark:text-color-dark dark:hover:text-color-hover-dark"
                >
                    Cancel
                </Link>
                <Button type="submit">Create Book</Button>
            </div>
        </form>
    );
}