import { Book } from "@/app/lib/models";
import Image from "next/image";

export default async function BookCard({ book }: { book: Book }) {
    return (
        <div className="p-2 ">
            <Image
                src={`/books/${book.cover}`}
                width={150}
                height={150}
                alt={`cover for ${book.name}`}
                className=""
            />
        </div>
    );
}