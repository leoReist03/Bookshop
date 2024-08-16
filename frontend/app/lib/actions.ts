'use server';

import z from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { BACKEND_URL_AUTHORS } from './constants';

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
    const { name, about, dateOfBirth, picture } = CreateAuthor.parse({
        name: formData.get('name'),
        about: formData.get('about'),
        dateOfBirth: formData.get('dateOfBirth'),
        picture: formData.get('picture') ? formData.get('picture') : '/defaultAuthorPicture.jpg',
    });

    await fetch(`${BACKEND_URL_AUTHORS}/onCreate/${name}/${dateOfBirth}/${picture}/${about}`);

    revalidatePath('/authors');
    redirect('/authors');
}

export async function updateAuthor(id: string, formData: FormData) {
    const { name, about, dateOfBirth, picture } = UpdateAuthor.parse({
        name: formData.get('name'),
        about: formData.get('about'),
        dateOfBirth: formData.get('dateOfBirth'),
        picture: formData.get('picture'),
    });

    revalidatePath('/authors');
    redirect('/authors');
}

export async function deleteAuthor(id: string, formData: FormData) {

    revalidatePath('/authors');
}