import Link from "next/link";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deleteBook } from "@/app/lib/actions/books";

export function CreateBook() {
    return (
        <Link
          href="/books/create"
          className="flex p-2 items-center rounded-lg bg-cyan  px-4 text-base font-medium text-white transition-colors hover:bg-cyan-dark dark:bg-teal-600 dark:hover:bg-teal-700 dark:text-zinc-800"
        >
          <span className="hidden md:block">Create Book</span>{' '}
          <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

export function UpdateBook({ id }: { id: string }) {
  return (
      <Link
          href={`/books/${id}/edit`}
          className="rounded-md bg-cyan dark:bg-teal-600 border-grey-200 dark:border-neutral-700 text-icewhite dark:text-neutral-800 hover:bg-cyan-dark dark:hover:bg-teal-700 p-2 h-fit w-fit flex flex-nowrap"
      >
          <span className="sr-only">Update</span>
          <PencilIcon className="w-5"/>
      </Link>
  )
}

export function DeleteBook({ id }: { id: string }) {
  const deleteBookWithId = deleteBook.bind(null, id);
  
  return (
    <form action={deleteBookWithId}>
      <button className="rounded-md bg-cyan dark:bg-teal-600 border-grey-200 dark:border-neutral-700 text-icewhite dark:text-neutral-800 hover:bg-cyan-dark dark:hover:bg-teal-700 p-2 h-fit">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  )
}
