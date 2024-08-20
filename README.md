# Bookshop

## to start backend
```bash
cd ./Bookshop/backend
nodemon app.js
```

## to start frontend
```bash
cd ./Bookshop/frontend
pnpm dev
```

## TODO:
- Liste mit 10 büchern nach genre
- Toggle list or grid
- Darkmode toggle
- Bei Authorliste
- Bücherliste filtern lassen
- Authorliste nach zeitspanne von geburtstag filtern lassen
- Loging
- Login
- Bookmark

## The problem with pictures:
i need to send them via the url to the backend in order to save them
except i use a filepath but then i still need a way of saving them in the project. 
manually is a bad way.

### possible solution
i change the structure of my project and handle database access from the frontend.
The backend would be obsolete

#### mongodb or sql 
if i were to change the structure of my project, i would rather use sql over mongodb 
i am more used to the relational db system and it is easier for me to understand
especially one-to-many relations would be easier to do
furthermore is the syntax of sql better and i fell like mongo db is not reliable enough


## Data samples
```json
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

[
    {
        "name":"ScienceFiction"
    },
    {
        "name":"Fantasy"
    }
]
```
