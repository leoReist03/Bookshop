export type Book = {
    Id: string;
    Cover: string;
    Name: string;
    Description: string;
    Pages: number;
    ReleaseDate: Date;
    Author: string;
    Genre: string;
}

export type Author = {
    Id: string;
    Name: string;
    DateOfBirth: Date;
    About: string;
    Picture: string;
}

export type Genre = {
    Id: string;
    Name: string;
}