import { Genre } from '@/app/lib/models';

const ITEMS_PER_PAGE = 5;

export async function fetchGenres(query: string, currentPage: number) {
    try {
        const response = await fetch(process.env.BACKEND_URL_GENRES + (query !== '' ? '?query=' + query : ''));

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.text();
        
        try {
            const genres = JSON.parse(data) as Genre[];
            return genres;
        } catch (err) {
            console.error('Error parsing JSON:', err);
            throw new Error('Failed to parse Genres data');
        }
    } catch (error) {
        console.error('Error fetching Genres:', error);
        throw new Error('Failed to fetch Genres');
    }
}

export async function fetchGenreById(id: string) {
    try {
        const genre = await fetch(process.env.BACKEND_URL_GENRES + 'find/' + id)
            .then((res) => res.json())
            .then((data: Genre) => {
                return data
        });

        return genre;
    } catch (error) {
        console.error('Database Error', error);
        throw new Error('Failed to fetch Genre');
    }
}

export async function fetchGenresPages(query: string) {
    try {
        const genreCount = await fetch(process.env.BACKEND_URL_GENRES + 'pages')
            .then((res) => res.json())
            .then((data: number[]) => {
                return data
        });
        const totalPages = Math.ceil(Number(genreCount.join()) / ITEMS_PER_PAGE);

        return totalPages;
    } catch (error) {
        console.error('Database Error', error);
        throw new Error('Failed to fetch total number of Genres');
    }
}