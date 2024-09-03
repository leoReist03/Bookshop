export type Book = {
    Id: string;
    Cover: string;
    Name: string;
    Description: string;
    Pages: number;
    ReleaseDate: string;
    Author: string;
    Genre: string;
}

export type Author = {
    Id: string;
    Name: string;
    DateOfBirth: string;
    About: string;
    Picture: string;
}