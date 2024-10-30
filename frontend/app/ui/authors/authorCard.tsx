import Image from "next/image"
import { Author } from "@/app/lib/models"
import { DeleteAuthor, UpdateAuthor } from "./buttons";
import Link from "next/link";


export default function AuthorCard({
    author,
}: {
    author: Author;
}) {
    return (
        <div className="bg-panel-two dark:bg-panel-two-dark p-4 border-solid flex mb-2">
            <Link
                href={`/authors/${author.Id}/details`}
            >
                <Image 
                    src={author.Picture}
                    alt={`picture of ${author.Name}`}
                    width={100}
                    height={100}
                    className="rounded-md border dark:border-zinc-600 hover:brightness-95 hover:cursor-pointer"
                />
            </Link>
            <div className="ml-5 w-3/4 flex flex-col text-left">
                <Link
                    href={`/authors/${author.Id}/details`}
                    className="w-fit"
                >
                    <span className="float-left mt-4 font-bold hover:cursor-pointer hover:text-color-hover dark:hover:text-color-hover-dark w-fit">{author.Name}</span>
                </Link>
                <span className="float-left mt-4 left">{author.DateOfBirth.toString()}</span>
            </div>
            <div className="flex gap-x-2">
                <UpdateAuthor id={author.Id} />
                <DeleteAuthor id={author.Id} />
            </div>
        </div>
    )
}