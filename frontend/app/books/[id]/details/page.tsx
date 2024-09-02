import { fetchBookById } from "@/app/lib/data/books";
import Pageheader from "@/app/ui/pageheader";
import Image from "next/image";
import Link from "next/link";
import { DeleteBook, UpdateBook } from "@/app/ui/books/buttons";

export default async function Page({ params }: { params: { id: string }}) {
    const id = params.id;
    const book = await fetchBookById(id);

    return (
        <div className="w-full text-center bg-icewhite text-cyan-dark p-3 rounded-lg mb-5">
            <Pageheader text={book.name} />
            <div className="flex flex-wrap">
                <div className="relative my-2 rounded-md w-full flex flex-nowrap">
                    <div className="grow">
                        <Image 
                            src={`/books/${book.cover}`}
                            alt={`picture of ${book.name}`}
                            width={160}
                            height={120}
                            className="rounded-md border hover:brightness-95"
                        />
                    </div>
                    <div className="flex justify-end gap-1">
                        <UpdateBook id={book.id} />
                        <DeleteBook id={book.id} />
                    </div>
                </div>
                <div className="text-left w-3/4 my-4">
                    <p><span className="font-bold">Author: </span>{book.author}</p>
                    <br />
                    <p><span className="font-bold">Release: </span>{book.release}</p>
                    <br />
                    <p><span className="font-bold">Genre: </span>{book.genre}</p>
                    <br />
                    <p><span className="font-bold">Pages: </span> {book.pages}</p>
                    <br />
                    <p><span className="font-bold">Description: </span>{book.description}</p>
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