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
        "id":"1",
        "cover":"cover",
        "name":"name",
        "description":"description",
        "pages":"300",
        "release":"2020-01-30",
        "authorId":"1",
        "genreId":"1"
    },
    {
        "id":"2",
        "cover":"cover",
        "name":"name",
        "description":"description",
        "pages":"300",
        "release":"2020-01-30",
        "authorId":"2",
        "genreId":"2"
    }
]
