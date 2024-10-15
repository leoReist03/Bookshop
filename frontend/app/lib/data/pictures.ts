'use server';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function getPictures(selectedOption: string, searchParam: string, currentPage: number, nextCursor: string, limit: number) {
    console.log(`Query: ${selectedOption}, Public ID: ${searchParam}, Next Cursor: ${nextCursor}, Limit: ${nextCursor}`);

    try {
        //Create expression for the search
        var expression =`tags:${selectedOption}`;

        //If a search param exists escape special characters and add it to the expression
        if (searchParam) {
            const escapedSearchParam = searchParam.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
            expression += ` AND public_id:${escapedSearchParam}*`;
        }

        //Create the search query
        var searchQuery = cloudinary.search
            .expression(expression)
            .sort_by('public_id', 'desc')
            .max_results(limit);

        //If a nextCursor exists add it to the query
        if (nextCursor) {
            searchQuery = searchQuery.next_cursor(nextCursor)
        }

        //Run the query and return results
        return await searchQuery.execute();
    } catch (error) {
        console.error('Error fetching pictures from cloudinary:', error);
        throw error;
    }
}

export async function getPicture(public_id: string) {
    return await cloudinary.search.expression().execute();
}