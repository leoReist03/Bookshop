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
        <div className="w-full text-center bg-icewhite text-cyan-dark p-3 rounded-lg mb-5">
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
                    <p><span className="font-bold">Author: </span>{author.Name}</p>
                    <br />
                    <p><span className="font-bold">Genre: </span>{genre.Name}</p>
                    <br />
                    <p><span className="font-bold">Release: </span>{book.ReleaseDate}</p>
                    <br />
                    <p><span className="font-bold">Pages: </span> {book.Pages}</p>
                    <br />
                    <p><span className="font-bold">Description: </span>{book.Description}</p>
                </div>
            </div>
            <div className=" flex justify-end">
                <Link
                    href="/books"
                    className="flex h-10 items-center rounded-lg px-4 text-base font-medium text-white bg-cyan hover:bg-cyan-dark transition-colors w-fit"
                    >
                        Back
                </Link>
            </div>
        </div>
    )
}