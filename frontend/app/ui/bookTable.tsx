import { getBooks } from "../lib/data";
import BookTableRow from "./bookTableRow";
import { Book } from '@/app/lib/models'

export default async function BooksTable() {
    const books = await getBooks();
    var count = 0;
    return (
            <table className="divide-y divide-gray-200 bg-cyan w-full rounded-lg">
                <thead className="text-start text-cyan-dark uppercase">
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