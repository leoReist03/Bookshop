'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const GenreShema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Name is required"),
});

type CreateGenreInput = z.infer<typeof GenreShema>;
type UpdateGenreInput = z.infer<typeof GenreShema>;

export async function createGenre(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const pic = formData.get('picture') as File;

    try {
        const validatedData = GenreShema.parse({
            ...rawData,
        });

        const response = await fetch(`${process.env.BACKEND_URL_GENRES}create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedData),
        });

        if (!response.ok) {
            throw new Error('Failed to create Genre');
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation Error', error.errors);
            return { success: false, errors: error.errors };
        }
        console.error('Database Error', error);
        throw new Error('Failed to create Genre');
    }

    revalidatePath('/genres');
    redirect('/genres');
}

export async function updateGenre(id: string, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());

    try {
        const validatedData = GenreShema.parse({
            ...rawData,
            id: id,
        });

        const response = await fetch(`${process.env.BACKEND_URL_GENRES}update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedData),
        });

        if (!response.ok) {
            throw new Error('Failed to update Genre');
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation Error', error.errors);
            return { success: false, errors: error.errors };
        }
        console.error('Database Error', error);
        throw new Error('Failed to update Genre');
    }

    revalidatePath('/genres');
    redirect('/genres');
}

export async function deleteGenre(id: string) {
    try {
        const response = await fetch(`${process.env.BACKEND_URL_GENRES}delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        });
    
        if (!response.ok) {
            throw new Error('Failed to delete Genre');
        }
    } catch (error) {
        console.error('Database Error', error);
        throw new Error('Failed to delete Genre');
    } finally {
        revalidatePath('/genres');
    }
}