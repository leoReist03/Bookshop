'use client';

import { createAuthor } from "@/app/lib/actions/authors"
import { UserIcon, IdentificationIcon, CakeIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline"
import Link from "next/link";
import { Button } from "@/app/ui/button";
import Image from "next/image";
import FormInput from "../form-input";
import React, { useState } from 'react';
import Pictures from "../pictures/pictures";

export default function Form() {
    const [authorImage, setAuthorImage] = useState<string | null>(null);

    const onPictureSelect = (value: string) => {
        setAuthorImage(value);
    }

    return (
        <form action={createAuthor} className="mt-6">
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
                    <input id='picture' name='picture' type='text' value={authorImage} hidden/>
                </>}
            </div>
            <div className="m-2">
                <FormInput
                    label='name'
                    name='name'
                    Icon={UserIcon}
                    type='text'
                />
            </div>
            <div className="m-2">
                <FormInput
                    label='about'
                    name='about'
                    as='textarea'
                    Icon={IdentificationIcon}
                />
            </div>
            <div className="m-2">
                <FormInput
                    label="dateOfBirth"
                    name="dateOfBirth"
                    Icon={CakeIcon}
                    type="date"
                />
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