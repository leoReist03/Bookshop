'use client';

import { updateBook } from "@/app/lib/actions/books";
import { UserIcon, NumberedListIcon, CalendarDaysIcon, IdentificationIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import FormInput from "../form-input";
import Pictures from "../pictures/pictures";
import React, { useState } from 'react';
import AdvancedSelect from "./advancedSelect";
import { EditBookFormProps } from "@/app/lib/interfaces";

export default function Form({ book, authors, genres }: EditBookFormProps) {
    const updateBookWithId = updateBook.bind(null, book.Id);
    const [bookCover, setBookCover] = useState<string | null>(book.Cover);

    const onPictureSelect = (value: string) => {
        setBookCover(value);
    }

    return (
        <form action={updateBookWithId} className="mt-6">
            <div className="m-2 rounded-md p-2">
                <label className="mb-2 block text-base font-medium text-left w-fit">
                    Cover:
                </label>
                <Pictures onPictureSelect={onPictureSelect} defaultType="books" />

                {bookCover && 
                <>
                    <Image
                        src={bookCover}
                        alt="The selected cover of the Book"
                        width={150}
                        height={150}
                        className="rounded-md border-2 border-border border-border-dark my-3"
                    />
                    <input id='cover' name='cover' type='text' value={bookCover} hidden readOnly/>
                </>}
            </div>
            <div className="m-2">
                <FormInput
                    label="name"
                    name="name"
                    Icon={UserIcon}
                    type="text"
                    defaultValue={book.Name}
                />
            </div>
            <div className="m-2">
                <FormInput
                    label="description"
                    name="description"
                    Icon={IdentificationIcon}
                    as="textarea"
                    defaultValue={book.Description}
                    rows={5}
                />
            </div>
            <div className="m-2">
                <FormInput
                    label="pages"
                    name="pages"
                    Icon={NumberedListIcon}
                    type="number"
                    min={1}
                    required
                    defaultValue={book.Pages}
                />
            </div>
            <div className="m-2">
                <FormInput
                    label="releaseDate"
                    name="releaseDate"
                    Icon={CalendarDaysIcon}
                    type="date"
                    defaultValue={book.ReleaseDate.toString()}
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
                    className="flex h-10 items-center rounded-lg px-4 text-base font-medium text-color hover:text-color-hover dark:text-color-dark dark:hover:text-color-hover-dark"
                >
                    Cancel
                </Link>
                <Button type="submit">Create Book</Button>
            </div>
        </form>
    );
}