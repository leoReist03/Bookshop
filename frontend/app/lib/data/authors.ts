import { BACKEND_URL_AUTHORS } from '../constants';
import { Author } from '@/app/lib/models';

const ITEMS_PER_PAGE = 5;

export async function fetchAuthors(query: string, currentPage: number) {
    try {
        var response;
        if (query != '') {
            response = await fetch(BACKEND_URL_AUTHORS + '?query=' + query)
        } else {
            response = await fetch(BACKEND_URL_AUTHORS);
        }

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.text();
        
        try {
            const authors = JSON.parse(data) as Author[];
            return authors;
        } catch (err) {
            console.error('Error parsing JSON:', err);
            throw new Error('Failed to parse authors data');
        }
    } catch (error) {
        console.error('Error fetching authors:', error);
        throw new Error('Failed to fetch authors');
    }
}

export async function fetchAuthorById(id: string) {
    try {
        const author = await fetch(BACKEND_URL_AUTHORS + 'find/' + id)
              .then((res) => res.json())
              .then((data: Author) => {
                return data
              });

              return author;
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