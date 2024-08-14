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
            <table className="divide-y divide-gray-200 bg-cyan w-full rounded-lg">
                <thead className="text-start text-icewhite uppercase">
                    <tr className="text-left">
                        <th className='pl-2'>#</th>
                        <th className='pl-2'>Cover</th>
                        <th className='pl-2'>Name</th>
                        <th className='pl-2'>Author</th>
                        <th className='pl-2'>Genre</th>
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