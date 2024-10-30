import { deleteAuthor } from "@/app/lib/actions/authors";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreateAuthor() {
    return (
        <Link
            href="/authors/create"
            className="flex p-2 items-center rounded-lg bg-button dark:bg-button-dark text-color-contrast dark:text-color-contrast-dark px-4 text-base font-medium text-white transition-colors hover:bg-button-hover dark:hover:bg-button-hover-dark transition-color"
        >
            <span>Create Author</span> {' '}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

export function UpdateAuthor({ id }: { id: string }) {
    return (
        <Link
            href={`/authors/${id}/edit`}
            className="rounded-md bg-button dark:bg-button-dark text-color-contrast dark:text-color-contrast-dark hover:bg-button-hover dark:hover:bg-button-hover-dark p-2 h-fit w-fit flex flex-nowrap transition-color"
        >
            <span className="sr-only">Update</span>
            <PencilIcon className="w-5"/>
        </Link>
    )
}

export function DeleteAuthor({ id }: { id: string }) {
    const deleteAuthorWithId = deleteAuthor.bind(null, id);

    return (
        <form action={deleteAuthorWithId}>
            <button className="rounded-md bg-button dark:bg-button-dark text-color-contrast dark:text-color-contrast-dark hover:bg-button-hover dark:hover:bg-button-hover-dark p-2 h-fit transition-color">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    )
}
