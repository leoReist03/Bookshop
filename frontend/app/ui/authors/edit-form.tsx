'use client';

import { updateAuthor } from "@/app/lib/actions/authors";
import { Author } from "@/app/lib/models";
import { UserIcon, IdentificationIcon, CakeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../button";
import FormInput from "../form-input";
import Pictures from "../pictures/pictures";
import React, { useState } from 'react';

export default function Form({ author }: { author: Author; }) {
    const updateAuthorWithId = updateAuthor.bind(null, author.Id);
    const [authorImage, setAuthorImage] = useState<string | null>(author.Picture);

    const onPictureSelect = (value: string) => {
        setAuthorImage(value);
    }
    
    return (
        <form action={updateAuthorWithId} className="mt-6">
            <div className="m-2 rounded-md p-2">
                <label className="mb-2 block text-base font-medium text-left w-fit">
                    Picture
                </label>
                <Pictures onPictureSelect={onPictureSelect} defaultType={'authors'}/>
                
                {authorImage &&
                <>
                    <Image
                        src={authorImage}
                        width={150}
                        height={150}
                        alt="The selected Image of the Author"
                        className="rounded-md border-2 border-border border-border-dark my-3"
                    />
                    <input id='picture' name='picture' type='text' value={authorImage} hidden readOnly/>
                </>}
            </div>
            <div className="m-2">
                <FormInput
                    label="name"
                    name="name"
                    Icon={UserIcon}
                    type="text"
                    defaultValue={author.Name}
                />
            </div>
            <div className="m-2">
                <FormInput
                    label="about"
                    name="about"
                    Icon={IdentificationIcon}
                    as="textarea"
                    defaultValue={author.About}
                    rows={5}
                />
            </div>
            <div className="m-2">
                <FormInput
                    label="birthday"
                    name="dateOfBirth"
                    Icon={CakeIcon}
                    defaultValue={author.DateOfBirth.toString()}
                    type="date"
                />
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