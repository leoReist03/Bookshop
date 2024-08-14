import { Book } from '@/app/lib/models';

export default function bookTableRow({
    book,
    count
}: {
    book: Book,
    count: number
}) {

    return (
        <tr className='odd:bg-white even:bg-gray-100 whitespace-nowrap'>
            <td className='pl-2'>{count}</td>
            <td className='pl-2'>{book.cover}</td>
            <td className='pl-2'>{book.name}</td>
            <td className='pl-2'>{book.author}</td>
            <td className='pl-2'>{book.genre}</td>
            <td>
            </td>
        </tr>
    );
}