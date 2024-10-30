import { updateAuthor } from "@/app/lib/actions/authors";
import { Author } from "@/app/lib/models";
import { UserIcon, IdentificationIcon, CakeIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "../button";
import Image from "next/image";
import FormInput from "../form-input";

export default function Form({
    author
}: {
    author: Author;
}) {
    const updateAuthorWithId = updateAuthor.bind(null, author.Id);
    
    return (
        <form action={updateAuthorWithId} className="mt-6">
            <div className="flex flex-row">
                <div className="basis-1/4">
                    <div className="m-2 bg-cyan-light dark:bg-zinc-900 hover:bg-cyan-less dark:hover:bg-zinc-950 rounded-md p-2">
                        <label htmlFor="picture">
                            <p className="mb-2 block text-base font-medium text-left w-fit">
                                Picture:
                            </p>
                            <div className="relative mt-2 rounded-md">
                                <Image 
                                    src={`/authors/${author.Picture}`}
                                    alt={`picture of ${author.Name}`}
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
                        <FormInput
                            label="name"
                            Icon={UserIcon}
                            type="text"
                            defaultValue={author.Name}
                        />
                    </div>
                    <div className="m-2">
                        <FormInput
                            label="about"
                            Icon={IdentificationIcon}
                            as="textarea"
                            defaultValue={author.About}
                            rows={5}
                        />
                    </div>
                    <div className="m-2">
                        <FormInput
                            label="birthday"
                            Icon={CakeIcon}
                            defaultValue={author.DateOfBirth.toString()}
                            type="date"
                        />
                    </div>
                </div>
            </div>
            <div className="mt-12 mr-8 flex justify-end gap-4">
                <Link
                href="/authors"
                className="flex h-10 items-center rounded-lg px-4 text-base font-medium text-color hover:text-color-hover dark:text-color-dark dark:hover:text-color-hover-dark transition-colors"
                >
                    Cancel
                </Link>
                <Button type="submit">Edit Author</Button>
            </div>
        </form>
    );
}