import { updateAuthor } from "@/app/lib/actions/authors";
import { Author } from "@/app/lib/models";
import { UserIcon, IdentificationIcon, CakeIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "../button";
import Image from "next/image";

export default function Form({
    author
}: {
    author: Author;
}) {
    const updateAuthorWithId = updateAuthor.bind(null, author.id);
    
    return (
        <form action={updateAuthorWithId} className="mt-6 text-cyan-dark">
            <div className="flex flex-row">
                <div className="basis-1/4">
                    <div className="m-2 bg-cyan-light hover:bg-cyan-less rounded-md p-2">
                        <label htmlFor="picture">
                            <p className="mb-2 block text-base font-medium text-left w-fit">
                                Picture:
                            </p>
                            <div className="relative mt-2 rounded-md">
                                <Image 
                                    src={`/authors/${author.picture}`}
                                    alt={`picture of ${author.name}`}
                                    width={140}
                                    height={120}
                                    className="rounded-md border mx-auto hover:brightness-95"
                                />
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <CloudArrowUpIcon className="w-8 h-8 mb-4" />
                                    <p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs">PNG or JPG(MAX. 800x400px)</p>
                                </div>
                                <input id="picture" name="picture" type="file" className="hidden" />
                            </div>
                        </label>
                    </div>
                </div>
                <div className="basis-3/4">
                    <div className="m-2">
                        <label htmlFor="name" className="mb-2 block text-base font-medium text-left w-fit">
                            Name:
                        </label>
                        <div className="relative mt-2 rounded-md ">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Name..."
                                defaultValue={author.name}
                                className="peer block w-3/4 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
                            />
                            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
                        </div>
                    </div>
                    <div className="m-2">
                        <label htmlFor="about" className="mb-2 block text-base font-medium text-left w-fit">
                            About:
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <textarea
                                id="about"
                                name="about"
                                placeholder="About..."
                                rows={5}
                                defaultValue={author.about}
                                className="peer block w-3/4 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 h-fit align-middle"
                            />
                            <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
                        </div>
                    </div>
                    <div className="m-2">
                        <label htmlFor="dateOfBirth" className="mb-2 block text-base font-medium text-left w-fit">
                            Date of Birth:
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <input
                                id="dateOfBirth"
                                name="dateOfBirth"
                                type="date"
                                placeholder="Date of Birth..."
                                defaultValue={author.dateOfBirth}
                                className="peer block w-3/4 rounded-md border border-gray-200 py-2 pl-10 pr-4 text-sm outline-2"
                            />
                            <CakeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-12 mr-8 flex justify-end gap-4">
                <Link
                href="/authors"
                className="flex h-10 items-center rounded-lg px-4 text-base font-medium text-cyan hover:text-cyan-dark transition-colors"
                >
                    Cancel
                </Link>
                <Button type="submit">Edit Author</Button>
            </div>
        </form>
    );
}