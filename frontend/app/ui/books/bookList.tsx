import BookCard from "./bookCard";
import { Book } from '@/app/lib/models'
import { fetchBooks } from "../../lib/data/books";

export default async function BookList({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const books = await fetchBooks(query, currentPage);

    return (
        <div className="w-full text-base mt-6 flex flex-wrap bg-cyan-light p-2">
            {
            books.map((book: Book) => {
                return (<BookCard key={book.name} book={book} />)
            })}
        </div>
    );
}