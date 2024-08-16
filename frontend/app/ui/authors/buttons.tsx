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
            className="flex p-2 items-center rounded-lg bg-cyan  px-4 text-base font-medium text-white transition-colors hover:bg-cyan-dark"
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
            className="rounded-md border p-2 hover:bg-gray-100 h-fit"
        >
            <span className="sr-only">Update</span>
            <PencilIcon className="w-5"/>
        </Link>
    )
}

export function DeleteAuthor({ id }: { id: string }) {
    return (
        <>
            <button className="rounded-md border p-2 hover:bg-gray-100 h-fit">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </>
    )
}
