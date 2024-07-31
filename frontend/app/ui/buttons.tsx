import Link from "next/link";

export function CreateBook() {
    return (
        <Link
          href="/dashboard/invoices/create"
          className="flex p-2 items-center rounded-lg bg-cyan  px-4 text-xs font-medium text-white transition-colors hover:bg-cyan-dark"
        >
          <span className="hidden md:block">Create Invoice</span>{' '}
          {/* <PlusIcon className="h-5 md:ml-4" /> */}
        </Link>
    );
}