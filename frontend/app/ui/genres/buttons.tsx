import Link from "next/link";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deleteGenre } from "@/app/lib/actions/genre";

export function CreateGenre() {
    return (
        <Link
            href="/genres/create"
            className="flex p-2 items-center rounded-lg bg-cyan  px-4 text-base font-medium text-white transition-colors hover:bg-cyan-dark"
        >
            <span className="hidden md:block">Create Genre</span>
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

export function UpdateGenre({ id }: { id: string }) {
    return (
        <Link
            href={`/genres/${id}/edit`}
            className="rounded-md border p-2 hover:bg-gray-100 h-fit"
        >
            <span className="sr-only">Update</span>
            <PencilIcon className="w-5" />
        </Link>
    );
}

export function DeleteGenre({ id }: { id: string }) {
    const deleteGenreWithId = deleteGenre.bind(null, id);

    return (
        <form action={deleteGenreWithId}>
            <button className="rounded-md border p-2 hover:bg-gray-100 h-fit">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    );
}