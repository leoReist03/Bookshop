import { createAuthor } from "@/app/lib/actions/authors"
import { UserIcon, IdentificationIcon, CakeIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline"
import Link from "next/link";
import { Button } from "@/app/ui/button";
import Image from "next/image";
import FormInput from "../form-input";

export default function Form() {
    return (
        <form action={createAuthor} className="mt-6">
            <div className="flex flex-row">
                <div className="basis-1/4">
                    <div className="m-2 bg-panel-two dark:bg-panel-two-dark rounded-md p-2">
                        <label htmlFor="picture">
                            <p className="mb-2 block text-base font-medium text-left w-fit">
                                Picture:
                            </p>
                            <div className="relative mt-2 rounded-md">
                                <Image 
                                    src={`/authors/defaultAuthorPicture.jpg`}
                                    alt={`default author picture`}
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
                        />
                    </div>
                    <div className="m-2">
                        <FormInput
                            label="about"
                            as="textarea"
                            Icon={IdentificationIcon}
                        />
                    </div>
                    <div className="m-2">
                        <FormInput
                            label="birthday"
                            Icon={CakeIcon}
                            type="date"
                        />
                    </div>
                </div>
            </div>
            <div className="mt-12 mr-8 flex justify-end gap-4">
                <Link
                    href="/authors"
                    className="flex h-10 items-center rounded-lg px-4 text-base font-medium hover:text-color-hover dark:hover:text-color-hover-dark transition-colors"
                >
                    Cancel
                </Link>
                <Button type="submit">Create Author</Button>
            </div>
        </form>
    );
}