import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";

export function CreateBook() {
    return (
        <Link
          href="/dashboard/books/create"
          className="flex p-2 items-center rounded-lg bg-cyan  px-4 text-xs font-medium text-white transition-colors hover:bg-cyan-dark"
        >
          <span className="hidden md:block">Create Book</span>{' '}
          <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}