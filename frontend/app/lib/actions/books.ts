'use server';

import z from 'zod';
import { BACKEND_URL_BOOKS } from '../constants';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const BookShema = z.object({
    id: z.string().optional(),
    cover: z.string().default('defaultBookCover.jpg'),
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    pages: z.number().min(1, "Pages is required"),
    release: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Release must be in YYYY-MM-DD format"),
    authorId: z.string().min(1, "Author is required"),
    genreId: z.string().min(1, "Genre is required"),
});

type CreateBookInput = z.infer<typeof BookShema>;
type UpdateBookInput = z.infer<typeof BookShema>;

export async function createBook(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const img = formData.get('cover') as File;

    try {
        const validatedData = BookShema.parse({
            ...rawData,
            cover: img.name === 'undefined' ? 'defaultBookCover.jpg' : img.name,
        });

        const response = await fetch(`${BACKEND_URL_BOOKS}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedData),
        });

        if (!response.ok) {
            throw new Error('Failed to create Book');
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation Error', error.errors);
            return { success: false, errors: error.errors };
        }
        console.error('Database Error', error);
        throw new Error('Failed to create Book');
    } finally {
        revalidatePath('/books');
        redirect('/books');
    }
}

export async function updateBook(id: string, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const img = formData.get('cover') as File;

    try {
        const validatedData = BookShema.parse({
            ...rawData,
            cover: img.name === 'undefined' ? 'defaultBookCover.jpg' : img.name,
            id: id
        });

        const response = await fetch(`${BACKEND_URL_BOOKS}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedData),
        });

        if (!response.ok) {
            throw new Error('Failed to update Book');
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation Error', error.errors);
            return { success: false, errors: error.errors };
        }
        console.error('Database Error', error);
        throw new Error('Failed to update Book');
    } finally {
        revalidatePath('/books');
        redirect('/books');
    }
}

export async function deleteBook(id: string) {
    try {
        const response = await fetch(`${BACKEND_URL_BOOKS}/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        });
    
        if (!response.ok) {
            throw new Error('Failed to delete Book');
        }
    } catch (error) {
        console.error('Database Error', error);
        throw new Error('Failed to delete Book');
    } finally {
        revalidatePath('/books');
    }
}