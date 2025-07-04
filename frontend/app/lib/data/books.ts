import { Book } from '@/app/lib/models';

const ITEMS_PER_PAGE = 5;

export async function fetchBooks(query: string, currentPage: number) {
    try {
        const response = await fetch(process.env.BACKEND_URL_BOOKS + (query !== '' ? '?query=' + query : ''));

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.text();

        try {
            const books = JSON.parse(data) as Book[];
            return books;
        } catch (err) {
            console.error('Error parsing JSON:', err);
            throw new Error('Failed to parse books data');
        }
    } catch (error) {
        console.error('Error fetching books:', error);
        throw new Error('Failed to fetch books');
    }
}

export async function fetchBookById(id: string) {
    try {
        const book = await fetch(process.env.BACKEND_URL_BOOKS + "find/" + id)
            .then((res) => res.json())
            .then((data: Book) => {
                return data
            });

        return book;
    } catch (error) {
        console.error('Database Error', error);
        throw new Error('Failed to fetch book');
    }
}

export async function fetchBooksPages(query: string) {
    try {
        const bookCount = await fetch(process.env.BACKEND_URL_BOOKS + 'pages')
            .then((res) => res.json())
            .then((data: number[]) => {
                return data
        });
        const totalPages = Math.ceil(Number(bookCount.join()) / ITEMS_PER_PAGE);

        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of books');
    }
}