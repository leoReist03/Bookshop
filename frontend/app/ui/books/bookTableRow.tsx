import { Book } from '@/app/lib/models';
import { UpdateBook, DeleteBook } from './buttons'

export default function bookTableRow({
    book,
    count
}: {
    book: Book,
    count: number
}) {

    return (
        <tr className='odd:bg-white even:bg-gray-100 whitespace-nowrap'>
            <td>{count}</td>
            <td>{book.cover}</td>
            <td>{book.name}</td>
            <td>{book.author}</td>
            <td>{book.genre}</td>
            <td className='flex'>
                <UpdateBook id={book.id} />
                <DeleteBook id={book.id} />
            </td>
        </tr>
    );
}