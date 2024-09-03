'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { BACKEND_URL_AUTHORS } from '../constants';

const AuthorSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Name is required"),
    about: z.string().min(1, "About is required"),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    picture: z.string().default('defaultAuthorPicture.jpg'),
});

type CreateAuthorInput = z.infer<typeof AuthorSchema>;
type UpdateAuthorInput = z.infer<typeof AuthorSchema>;

export async function createAuthor(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const pic = formData.get('picture') as File;
    const dateOfBirth = formData.get('dateOfBirth');

    try {
        const validatedData = AuthorSchema.parse({
            ...rawData,
            picture: pic.name === 'undefined' ? 'defaultAuthorPicture.jpg' : `/${pic.name}`,
        });

        const response = await fetch(`${BACKEND_URL_AUTHORS}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedData),
        });
        console.log(response);

        if (!response.ok) {
            throw new Error('Failed to create Author');
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation Error', error.errors);
            return { success: false, errors: error.errors };
        }
        console.error('Database Error', error);
        throw new Error('Failed to create Author');
    } finally {
        revalidatePath('/authors');
        redirect('/authors');
    }
}

export async function updateAuthor(id: string, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const pic = formData.get('picture') as File;

    try {
        const validatedData = AuthorSchema.parse({
            ...rawData,
            picture: pic.name === 'undefined' ? 'defaultAuthorPicture.jpg' : `/${pic.name}`,
            id: id,
        });

        console.log(JSON.stringify(validatedData));

        const response = await fetch(`${BACKEND_URL_AUTHORS}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedData),
        });

        if (!response.ok) {
            throw new Error('Failed to update Author');
        }

        revalidatePath('/authors');
        redirect('/authors');
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation Error', error.errors);
            return { success: false, errors: error.errors };
        }
        console.error('Database Error', error);
        throw new Error('Failed to update Author');
    }
}

export async function deleteAuthor(id: string) {
    try {
        const response = await fetch(`${BACKEND_URL_AUTHORS}/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        });
    
        if (!response.ok) {
            throw new Error('Failed to delete Author');
        }
    
        revalidatePath('/authors');
    } catch (error) {
        console.error('Database Error', error);
        throw new Error('Failed to delete Author');
    }
}