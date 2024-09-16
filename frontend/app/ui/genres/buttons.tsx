import Link from "next/link";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deleteGenre } from "@/app/lib/actions/genre";

export function CreateGenre() {
    return (
        <Link
            href="/genres/create"
          className="flex p-2 items-center rounded-lg bg-cyan  px-4 text-base font-medium text-white transition-colors hover:bg-cyan-dark dark:bg-teal-600 dark:hover:bg-teal-700 dark:text-zinc-800"
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
          className="rounded-md bg-cyan dark:bg-teal-600 border-grey-200 dark:border-neutral-700 text-icewhite dark:text-neutral-800 hover:bg-cyan-dark dark:hover:bg-teal-700 p-2 h-fit w-fit flex flex-nowrap"
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
      <button className="rounded-md bg-cyan dark:bg-teal-600 border-grey-200 dark:border-neutral-700 text-icewhite dark:text-neutral-800 hover:bg-cyan-dark dark:hover:bg-teal-700 p-2 h-fit">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    );
}