# Bookshop
to start backend: nodemon app.js
in ./Bookshop/backend
the frontend-server rund on localhost port 3000

to start frontend: pnpm dev
in ./Bookshop/frontend
the backend-server runs on localhost port 8000

TODO:
liste mit 10 büchern nach genre
toggle list or grid
bei author details liste mit all seinen büchern
bücherliste filtern lassen
in authorliste nach zeitspanne von geburtstag filtern lassen
Loging
Login

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
