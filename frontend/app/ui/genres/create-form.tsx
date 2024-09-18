import { createGenre } from "@/app/lib/actions/genre";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "../button";

export default function Form() {
    return (
        <form action={createGenre} className="mt-6">
            <div className="m-2">
                <label htmlFor="name" className="mb-2 block text-base font-medium text-left w-fit">
                    Name:
                </label>
                <div className="relative mt-2 rounded-md">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Name..."
                                className="py-3 px-4 pl-10 block w-3/4 border-gray-200 rounded-lg text-sm focus:border-cyan focus:ring-cyan dark:bg-zinc-900 dark:border-zinc-700 dark:focus:ring-zinc-600 dark:placeholder-teal-600"
                    />
                    <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
                </div>
            </div>
            <div className="mt-12 mr-8 flex justify-end gap-4">
                <Link
                    href="/genres"
                    className="flex h-10 items-center rounded-lg px-4 text-base font-medium hover:text-cyan-dark transition-colors"
                >
                    Cancel
                </Link>
                <Button type="submit">Create Genre</Button>
            </div>
        </form>
    );
}