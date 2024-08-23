import Link from "next/link";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deleteBook } from "@/app/lib/actions/books";

export function CreateBook() {
    return (
        <Link
          href="/books/create"
          className="flex p-2 items-center rounded-lg bg-cyan  px-4 text-base font-medium text-white transition-colors hover:bg-cyan-dark"
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
          className="rounded-md border p-2 hover:bg-gray-100 h-fit w-fit flex flex-nowrap"
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
      <button className="rounded-md border p-2 hover:bg-gray-100 h-fit">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  )
}
