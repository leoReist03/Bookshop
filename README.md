# Bookshop
Book
    id: int
    cover: string
    name: string
    pages: int
    release: date
    authorId: int
    genreId: int
    
Author
    id: int
    name: str
    dateOfBirth: date

Genre
    id: int
    name: str

pages 
    index
    per object
        list
        create
        edit
        details

to start project: nodemon app.js
in ./Bookshop/backend

books sample:
[
    {
        "cover":"cover",
        "name":"name",
        "description":"description",
        "pages":"300",
        "release":"2020-01-30",
        "authorId":"1",
        "genreId":"1"
    },
    {
        "cover":"cover",
        "name":"name",
        "description":"description",
        "pages":"300",
        "release":"2020-01-30",
        "authorId":"2",
        "genreId":"2"
    }
]

authors sample:
[
    {
        "name":"PierceBrown",
        "dateOfBirth":"1988-01-28"
    },
    {
        "name":"BrandonSanderson",
        "dateOfBirth":"1975-12-19"
    }
]

genres sample:
[
    {
        "name":"ScienceFiction"
    },
    {
        "name":"Fantasy"
    }
]