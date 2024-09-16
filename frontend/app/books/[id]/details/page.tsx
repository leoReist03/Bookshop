import { fetchBookById } from "@/app/lib/data/books";
import Pageheader from "@/app/ui/pageheader";
import Image from "next/image";
import Link from "next/link";
import { DeleteBook, UpdateBook } from "@/app/ui/books/buttons";
import { fetchAuthorById } from "@/app/lib/data/authors";
import { fetchGenreById } from "@/app/lib/data/genres";

export default async function Page({ params }: { params: { id: string }}) {
    const id = params.id;
    const book = await fetchBookById(id);
    const author = await fetchAuthorById(book.Author);
    const genre = await fetchGenreById(book.Genre);

    return (
        <div className="w-full text-center bg-icewhite dark:bg-zinc-800 text-cyan-dark dark:text-teal-600 p-3 rounded-lg mb-5">
            <Pageheader text={book.Name} />
            <div className="flex flex-wrap">
                <div className="relative my-2 rounded-md w-full flex flex-nowrap">
                    <div className="grow">
                        <Image 
                            src={`/books/${book.Cover}`}
                            alt={`picture of ${book.Name}`}
                            width={160}
                            height={120}
                            className="rounded-md border hover:brightness-95"
                        />
                    </div>
                    <div className="flex justify-end gap-1">
                        <UpdateBook id={book.Id} />
                        <DeleteBook id={book.Id} />
                    </div>
                </div>
                <div className="text-left w-3/4 my-4">
                    <div className="pt-2"><span className="font-bold text-cyan dark:text-teal-500">Author: </span>{author.Name}</div>
                    <div className="pt-2"><span className="font-bold text-cyan dark:text-teal-500">Genre: </span>{genre.Name}</div>
                    <div className="pt-2"><span className="font-bold text-cyan dark:text-teal-500">Release: </span>{book.ReleaseDate.toString()}</div>
                    <div className="pt-2"><span className="font-bold text-cyan dark:text-teal-500">Pages: </span> {book.Pages}</div>
                    <div className="pt-2"><span className="font-bold text-cyan dark:text-teal-500">Description: </span>{book.Description}</div>
                </div>
            </div>
            <div className=" flex justify-end">
                <Link
                    href="/books"
                    className="flex h-10 items-center rounded-lg px-4 text-base font-medium text-white dark:text-zinc-800 bg-cyan dark:bg-teal-600 hover:bg-cyan-dark dark:hover:bg-teal-700 transition-colors w-fit"
                    >
                        Back
                </Link>
            </div>
        </div>
    )
}