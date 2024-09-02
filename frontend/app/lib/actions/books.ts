'use server';

import z from 'zod';
import { BACKEND_URL_BOOKS } from '../constants';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormShema = z.object({
    id: z.string(),
    cover: z.string(),
    name: z.string(),
    description: z.string(),
    pages: z.number(),
    release: z.string(),
    authorId: z.string(),
    genreId: z.string(),
});

const CreateBook = FormShema.omit({ id: true});

export async function createBook(formData: FormData) {
    const img = formData.get('cover') as File;

    const { cover, name, description, pages, release, authorId, genreId } = CreateBook.parse({
        name: formData.get('name'),
        description: formData.get('description'),
        pages: formData.get('pages'),
        release: formData.get('release'),
        authorId: formData.get('author'),
        genreId: formData.get('genre'),
        cover: img.name == 'undefined' ? '/defaultBookPicture.jpg' : '/' + img.name,
    });

    await fetch(`${BACKEND_URL_BOOKS}/onCreate/${cover}/${name}/${description}/${pages}/${release}/${authorId}/${genreId}`)

    revalidatePath('/books');
    redirect('/books');
}

export async function updateBook(id: string, formData: FormData) {
    const img = formData.get('cover') as File;

    const { cover, name, description, pages, release, authorId, genreId } = CreateBook.parse({
        name: formData.get('name'),
        description: formData.get('description'),
        pages: formData.get('pages'),
        release: formData.get('release'),
        authorId: formData.get('author'),
        genreId: formData.get('genre'),
        cover: img.name == 'undefined' ? '/defaultBookPicture.jpg' : '/' + img.name,
    });
    
    await fetch(`${BACKEND_URL_BOOKS}/update/${id}/${cover}/${name}/${description}/${pages}/${release}/${authorId}/${genreId}`);

    revalidatePath('/books');
    redirect('/books');
}

export async function deleteBook(id: string) {
    await fetch(`${BACKEND_URL_BOOKS}/delete/${id}`);

    revalidatePath('/books');
    redirect('/books');
}