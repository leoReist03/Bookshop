import { useState, useEffect } from 'react';
import { BACKEND_URL_BOOKS } from '@/app/lib/constants';
import { Book } from '@/app/lib/models';

export async function getBooks() {
    var books = await fetch(BACKEND_URL_BOOKS)
        .then((res) => res.json())
        .then((data: Book[]) => {
            return data
        });

    return books;
}