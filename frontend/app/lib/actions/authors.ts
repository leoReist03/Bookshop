'use server';

import z from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { BACKEND_URL_AUTHORS } from '../constants';

const FormShema = z.object({
    id: z.string(),
    name: z.string(),
    about: z.string(),
    dateOfBirth: z.string(),
    picture: z.string(),
});

const CreateAuthor = FormShema.omit({ id: true });
const UpdateAuthor = FormShema.omit({ id: true });

export async function createAuthor(formData: FormData) {
    const pic = formData.get('picture') as File;

    const { name, about, dateOfBirth, picture } = CreateAuthor.parse({
        name: formData.get('name'),
        about: formData.get('about'),
        dateOfBirth: formData.get('dateOfBirth'),
        picture: pic.name == 'undefined' ? '/defaultAuthorPicture.jpg' : "/" + pic.name,
    });

    await fetch(`${BACKEND_URL_AUTHORS}/onCreate/${name}/${dateOfBirth}/${picture}/${about}`);

    revalidatePath('/authors');
    redirect('/authors');
}

export async function updateAuthor(id: string, formData: FormData) {
    const pic = formData.get('picture') as File;

    const { name, about, dateOfBirth, picture } = UpdateAuthor.parse({
        name: formData.get('name'),
        about: formData.get('about'),
        dateOfBirth: formData.get('dateOfBirth'),
        picture: pic.name == 'undefined' ? '/defaultAuthorPicture.jpg' : "/" + pic.name,
    });

    await fetch(`${BACKEND_URL_AUTHORS}/update/${id}/${name}/${dateOfBirth}/${picture}/${about}`);

    revalidatePath('/authors');
    redirect('/authors');
}

export async function deleteAuthor(id: string) {
    await fetch(`${BACKEND_URL_AUTHORS}/delete/${id}`);

    revalidatePath('/authors');
}