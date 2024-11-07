'use server';

import { v2 as cloudinary } from 'cloudinary';
import { UploadApiOptions } from 'cloudinary';
import { getPublicIdFromSecureUrl } from './utils';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function getPictures(selectedOption: string, searchParam: string, currentPage: number, nextCursor: string, limit: number) {
    try {
        //Create expression for the search
        var expression =`folder:${selectedOption}`;

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
        console.error('Error fetching pictures from Cloudinary:', error);
        throw error;
    }
}

export async function uploadPicture(file: string, filename: string, type: string) {
    try {
        const options: UploadApiOptions = {
            resource_type: 'auto',
            public_id: filename,
            folder: type === 'book' ? 'books' : 'authors',
        }
    
        cloudinary.uploader.upload(file, options);
    } catch (error) {
        console.error('Error uploading picture to Cloudinary:', error);
        throw error;
    }
}

export async function deletePicture(secure_url: string) {
    try {
        const public_id = getPublicIdFromSecureUrl(secure_url);
        cloudinary.uploader.destroy(public_id);
    } catch (error) {
        console.error('Error deleting picture from Cloudinary', error)
        throw error;
    }
    revalidatePath('/', 'page');
}