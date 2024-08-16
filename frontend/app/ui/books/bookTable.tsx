import BookTableRow from "./bookTableRow";
import { Book } from '@/app/lib/models'
import { fetchBooks } from "../../lib/data";

export default async function BooksTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    var count = 0;

    const books = await fetchBooks(query, currentPage);

    return (
            <table className="divide-y divide-gray-200 bg-cyan w-full rounded-lg text-base mt-6">
                <thead className="text-start text-icewhite uppercase text-lg">
                    <tr className="text-left">
                        <th>#</th>
                        <th>Cover</th>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Genre</th>
                    </tr>
                </thead>
                <tbody className="text-left text-cyan-dark">
                    {
                    books.map((book: Book) => {
                        count++
                        return (<BookTableRow key={book.name} book={book} count={count} />)
                    })}
                </tbody>
            </table>
    );
}