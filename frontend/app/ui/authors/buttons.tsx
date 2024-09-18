import { deleteAuthor } from "@/app/lib/actions/authors";
import { ExclamationCircleIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function Details({ id }: { id: string }) {
    return (
        <Link
            href={`/authors/${id}/details`}
            className="rounded-md border p-2 hover:bg-gray-100 h-fit"
        >
            <span className="sr-only">Details</span> {' '}
            <ExclamationCircleIcon className="w-5 text-linkblue hover:text-linkblue-active"/>
        </Link>
    )
}

export function CreateAuthor() {
    return (
        <Link
            href="/authors/create"
            className="flex p-2 items-center rounded-lg bg-cyan dark:bg-teal-600 dark:text-zinc-800 px-4 text-base font-medium text-white transition-colors hover:bg-cyan-dark dark:hover:bg-teal-700"
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
            className="rounded-md bg-cyan dark:bg-teal-600 border-grey-200 dark:border-neutral-700 text-icewhite dark:text-neutral-800 hover:bg-cyan-dark dark:hover:bg-teal-700 p-2 h-fit w-fit flex flex-nowrap"
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
            <button className="rounded-md bg-cyan dark:bg-teal-600 border-grey-200 dark:border-neutral-700 text-icewhite dark:text-neutral-800 hover:bg-cyan-dark dark:hover:bg-teal-700 p-2 h-fit">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    )
}
