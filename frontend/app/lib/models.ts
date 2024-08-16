export type Book = {
    id: string;
    cover: string;
    name: string;
    description: string;
    pages: number;
    release: string;
    author: string;
    genre: string;
}

export type Author = {
    id: string;
    name: string;
    dateOfBirth: string;
    picture?: string;
    about: string;
}