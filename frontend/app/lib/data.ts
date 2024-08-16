import { BACKEND_URL_AUTHORS, BACKEND_URL_BOOKS } from '@/app/lib/constants';
import { Book, Author } from '@/app/lib/models';

const ITEMS_PER_PAGE = 5;

export async function fetchBooks(query: string, currentPage: number) {
    try {
        var books = await fetch(BACKEND_URL_BOOKS)
            .then((res) => res.json())
            .then((data: Book[]) => {
                return data
            });
    
        return books;
    } catch (error) {
        console.error('Database Error', error);
        throw new Error('Failed to fetch books');
    }
}

export async function fetchBooksPages(query: string) {
    try {
        const bookCount = await fetch(BACKEND_URL_BOOKS + 'pages')
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

export async function fetchAuthors(query: string, currentPage: number) {
    try {
        var authors = await fetch(BACKEND_URL_AUTHORS)
            .then((res) => res.json())
            .then((data: Author[]) => {
                return data
            });
        
            return authors;
    } catch (error) {
        console.error('Database Error', error);
        throw new Error('Failed to fetch authors');
    }
}

export async function fetchAuthorById(id: string) {
    try {
        const author = await fetch(BACKEND_URL_AUTHORS + 'find/' + id)
              .then((res) => res.json())
              .then((data: Author[]) => {
                return data
              });

              return author[0];
    } catch (error) {
        console.error('Database Error', error);
        throw new Error('Failed to fetch author');
    }
}

export async function fetchAuthorsPages(query: string) {
    try {
        const authorCount = await fetch(BACKEND_URL_AUTHORS + 'pages')
            .then((res) => res.json())
            .then((data: number[]) => {
                return data
            });
        const totalPages = Math.ceil(Number(authorCount.join()) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Database Error', error);
        throw new Error('Failed to fetch total number of authors');
    }
}