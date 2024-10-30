import { fetchAuthorById } from "@/app/lib/data/authors";
import Pageheader from "@/app/ui/pageheader";
import Image from "next/image";
import Link from "next/link";
import { UpdateAuthor, DeleteAuthor } from "@/app/ui/authors/buttons";

export default async function Page({ params }: { params: { id: string }}) {
    const id = params.id;
    const author = await fetchAuthorById(id);

    return (
        <div className="w-full text-center bg-panel dark:bg-panel-dark text-color dark:text-color-dark p-3 rounded-lg mb-5">
            <Pageheader text={author.Name} />
            <div className="flex flex-wrap">
                <div className="relative my-2 rounded-md w-full flex flex-nowrap">
                    <div className="grow">
                        <Image 
                            src={author.Picture}
                            alt={`picture of ${author.Name}`}
                            width={160}
                            height={120}
                            className="rounded-md border border-grey-200 dark:border-zinc-600 hover:brightness-95"
                        />
                    </div>
                    <div className="flex justify-end gap-1">
                        <UpdateAuthor id={author.Id} />
                        <DeleteAuthor id={author.Id} />
                    </div>
                </div>
                <div className="text-left w-3/4 my-4">
                    <div className="pt-2"><span className="font-bold text-cyan dark:text-teal-500">About: </span>{author.About}</div>
                    <div className="pt-2"><span className="font-bold text-cyan dark:text-teal-500">Date of Birth: </span>{author.DateOfBirth.toString()}</div>
                    <div className="pt-2"><span className="font-bold text-cyan dark:text-teal-500">Books Published by: </span></div>
                </div>
            </div>
            <div className=" flex justify-end">
                <Link
                    href="/authors"
                    className="flex h-10 items-center rounded-lg px-4 text-base font-medium text-color-contrast dark:text-color-contrast-dark bg-button dark:bg-button-dark hover:bg-button-hover dark:hover:bg-button-hover-dark transition-colors w-fit"
                    >
                        Back
                </Link>
            </div>
        </div>
    );
}