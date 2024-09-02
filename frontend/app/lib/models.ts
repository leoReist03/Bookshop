export type Book = {
    Id: string;
    Cover: string;
    Name: string;
    Description: string;
    Pages: number;
    Release: string;
    Author: string;
    Genre: string;
}

export type Author = {
    Id: string;
    Name: string;
    DateOfBirth: string;
    Picture?: string;
    About: string;
}