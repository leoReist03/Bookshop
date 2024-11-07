// Function that generates the pagination numbers
export const generatePagination = (currentPage: number, totalPages: number) => {
    if (totalPages <= 5) {
        return Array.from({ length: totalPages}, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    if (currentPage >= totalPages -2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    return [
        1,
        '...',
        currentPage -1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
    ];
};

// Function that returns a promise which reads a file as a DataUrl
export const readAsDataURL = (file: File) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.readAsDataURL(file);
    });
}

// Function that extracts the cloudinary public_id from a cloudinary secure_url
export function getPublicIdFromSecureUrl(secure_url: string) {
    const urlParts = secure_url.split('/');
    const withFileExtension = urlParts[urlParts.length - 2] + '/' + urlParts[urlParts.length - 1];
    const public_id = withFileExtension.split('.')[0];
    return public_id;
}