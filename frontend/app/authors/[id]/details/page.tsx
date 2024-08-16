import { fetchAuthorById } from "@/app/lib/data";
import Pageheader from "@/app/ui/pageheader";
import Image from "next/image";
import Link from "next/link";
import { UpdateAuthor, DeleteAuthor } from "@/app/ui/authors/buttons";

export default async function Page({ params }: { params: { id: string }}) {
    const id = params.id;
    const author = await fetchAuthorById(id);

    return (
        <div className="w-full text-center bg-icewhite text-cyan-dark p-3 rounded-lg mb-5">
            <Pageheader text={author.name} />
            <div className="flex flex-wrap">
                <div className="relative my-2 rounded-md w-full flex flex-nowrap">
                    <div className="grow">
                        <Image 
                            src={`/authors${author.picture}`}
                            alt={`picture of ${author.name}`}
                            width={160}
                            height={120}
                            className="rounded-md border hover:brightness-95"
                        />
                    </div>
                    <div className="flex justify-end gap-1">
                        <UpdateAuthor id={author.id} />
                        <DeleteAuthor id={author.id} />
                    </div>
                </div>
                <div className="text-left w-3/4 my-4">
                    <p><span className="font-bold">About: </span>{author.about}</p>
                    <br />
                    <p><span className="font-bold">Date of birth: </span>{author.dateOfBirth}</p>
                    <br />
                    <p><span className="font-bold">Books published by {author.name}: </span></p>
                </div>
            </div>
            <div className=" flex justify-end">
                <Link
                    href="/authors"
                    className="flex h-10 items-center rounded-lg px-4 text-base font-medium text-white bg-cyan hover:bg-cyan-dark transition-colors w-fit"
                    >
                        Back
                </Link>
            </div>
        </div>
    );
}