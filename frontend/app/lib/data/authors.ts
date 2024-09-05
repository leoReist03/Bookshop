import { Author } from '@/app/lib/models';

const ITEMS_PER_PAGE = 5;

export async function fetchAuthors(query: string, currentPage: number) {
    try {
        const response = await fetch(process.env.BACKEND_URL_AUTHORS + (query !== '' ? '?query=' + query : ''));

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.text();
        
        try {
            const authors = JSON.parse(data) as Author[];
            return authors;
        } catch (err) {
            console.error('Error parsing JSON:', err);
            throw new Error('Failed to parse Authors data');
        }
    } catch (error) {
        console.error('Error fetching Authors:', error);
        throw new Error('Failed to fetch Authors');
    }
}

export async function fetchAuthorById(id: string) {
    try {
        const author = await fetch(process.env.BACKEND_URL_AUTHORS + 'find/' + id)
              .then((res) => res.json())
              .then((data: Author) => {
                return data
              });

              return author;
    } catch (error) {
        console.error('Database Error', error);
        throw new Error('Failed to fetch Author');
    }
}

export async function fetchAuthorsPages(query: string) {
    try {
        console.log(`${process.env.BACKEND_URL_AUTHORS}pages`);
        const authorCount = await fetch(`${process.env.BACKEND_URL_AUTHORS}pages`)
            .then((res) => res.json())
            .then((data: number[]) => {
                return data
            });
            
        const totalPages = Math.ceil(Number(authorCount.join()) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Database Error', error);
        throw new Error('Failed to fetch total number of Authors');
    }
}