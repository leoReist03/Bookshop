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
        <div className="bg-cyan-light p-4 border-solid flex">
            <Link
                href={`/authors/${author.id}/details`}
            >
                <Image 
                    src={`/authors${author.picture}`}
                    alt={`picture of ${author.name}`}
                    width={100}
                    height={100}
                    className="rounded-md border hover:brightness-95 hover:cursor-pointer"
                />
            </Link>
            <div className="ml-5 text-cyan-dark w-3/4 flex flex-col text-left">
                <Link
                    href={`/authors/${author.id}/details`}
                    className="w-fit"
                >
                <span className="float-left mt-4 font-bold hover:cursor-pointer hover:text-cyan w-fit">{author.name}</span>
                </Link>
                <span className="float-left mt-4 left">{author.dateOfBirth}</span>
            </div>
            <div className="flex ">
                <UpdateAuthor id={author.id} />
                <DeleteAuthor id={author.id} />
            </div>
        </div>
    )
}