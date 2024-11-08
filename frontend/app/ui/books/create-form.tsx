'use client';

import { createBook } from "@/app/lib/actions/books";
import { UserIcon, NumberedListIcon, CalendarDaysIcon, IdentificationIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import AdvancedSelect from "./advancedSelect";
import FormInput from "../form-input";
import React, { useState } from 'react';
import Pictures from "../pictures/pictures";
import { CreateBookFormProps } from "@/app/lib/interfaces";

export default function Form({ genres, authors }: CreateBookFormProps) {
    const [bookCover, setBookCover] = useState<string | null>(null);

    const onPictureSelect = (value: string) => {
        setBookCover(value);
    }

    return (
        <form action={createBook} className="mt-6">
            <div className="m-2 rounded-md p-2">
                <label className="mb-2 block text-base font-medium text-left w-fit">
                    Cover
                </label>

                {bookCover && 
                <>
                    <Image
                        src={bookCover}
                        width={150}
                        height={150}
                        alt="The selected Image of the Author"
                        className="rounded-md border-2 border-border border-border-dark my-3"
                    />
                    <input id='cover' name='cover' type='text' value={bookCover} hidden/>
                    <Button onClick={() => setBookCover(null)}>Remove Picture</Button>
                </>}

                {!bookCover && 
                    <Pictures onPictureSelect={onPictureSelect} defaultType={'books'}/>
                }
                
            </div>
            <div className="m-2">
                <FormInput
                    label="name"
                    name="name"
                    Icon={UserIcon}
                    type="text"
                />
            </div>
            <div className="m-2">
                <FormInput
                    label="description"
                    name="description"
                    Icon={IdentificationIcon}
                    as="textarea"
                />
            </div>
            <div className="m-2">
                <FormInput
                    label="pages"
                    name="pages"
                    Icon={NumberedListIcon}
                    type="number"
                    min="1"
                    required
                />
            </div>
            <div className="m-2">
                <FormInput
                    label="release"
                    name="releaseDate"
                    Icon={CalendarDaysIcon}
                    type="date"
                />
            </div>
            <div className="m-2">
                <AdvancedSelect label="authorId" group={authors} groupName="Author" />
            </div>
            <div className="m-2">
                <AdvancedSelect label="genreId" group={genres} groupName="Genre" />
            </div>
            <div className="mt-12 mr-8 flex justify-end gap-4">
                <Link
                    href="/books"
                    className="flex h-10 items-center rounded-lg px-4 text-base font-medium hover:text-cyan-dark dark:hover:text-teal-700 transition-colors"
                >
                    Cancel
                </Link>
                <Button type="submit">Create Book</Button>
            </div>
        </form>
    );
}