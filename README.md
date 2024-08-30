# Bookshop
This is a learning project by Leo Reist.
The goal is to create a good website with a nodejs and express backend and a next.js frontend.
While learning node, express, nextjs and their best practices.

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

## Todolist:
- Handle upload of images maybe cloudinary
- List of 10 books by genre
- Toggle list or grid
- Filterable booklist
- Filter Authorliste by timespan of date of birth
- Loging
- Login
- Bookmark
- Language picker
- Darkmode toggle

## The problem with pictures:
Im the current state i would need to send pictures via the url to the backend in order to save them.
Except i use a filepath but then i still need a way of saving them in the project. 
Manually is a bad way to do that.

### Possible solution
I change the structure of my project and handle database access from the frontend.
The backend would be obsolete.
Or i would install a different system to save pictures and only safe the path into the database.
https://www.beekeeperstudio.io/blog/how-to-store-images-in-a-database

### Mongodb or Sql 
if i were to change the structure of my project, i would rather use sql over mongodb 
i am more used to the relational db system and it is easier for me to understand
especially one-to-many relations would be easier to do
furthermore is the syntax of sql better and i fell like mongo db is not reliable enough

## Data samples
### Books
```json
[
    {
        "_id": "669a7c9bc299e72c41543d67",
        "cover":"redRising.jpg",
        "name":"Red Rising",
        "description":"Darrow is a Helldiver. A pioneer of Mars.

Born to slave beneath the earth so that one day, future generations might live above it.

He is a Red - humankind's lowest caste. But he has something the Golds - the ruthless ruling class - will never understand.

He has a wife he worships, a family who give him strength. He has love.

And when they take that from him, all that remains is revenge . . .",
        "pages":"416",
        "release":"2014-06-15",
        "authorId":"6697c7559a78c3576e223421",
        "genreId":"6697bd6b9a78c3576e223420"
    },
    {
        "_id": "669fb874e6cfa7c0e911f9e7",
        "cover":"wayOfKings.jpg",
        "name":"Way of Kings",
        "description":"Brandon Sanderson, widely acclaimed for his work completing Robert Jordan's 'Wheel of Time saga', begins a grand cycle of his own, with The Way of Kings, Book One of the Stormlight Archive.

Roshar is a world of stone and storms. Uncanny tempests of incredible power sweep across the rocky terrain so frequently that they have shaped ecology and civilization alike. Animals hide in shells, trees pull in branches, and grass retracts into the soilless ground. Cities are built only where the topography offers shelter.

It has been centuries since the fall of the ten consecrated orders known as the Knights Radiant, but their Shardblades and Shardplate remain: mystical swords and suits of armor that transform ordinary men into near-invincible warriors. Men trade kingdoms for Shardblades. Wars were fought for them, and won by them.

One such war rages on a ruined landscape called the Shattered Plains. There, Kaladin, who traded his medical apprenticeship for a spear to protect his little brother, has been reduced to slavery. In a war that makes no sense, where ten armies fight separately against a single foe, he struggles to save his men and to fathom the leaders who consider them expendable.

Brightlord Dalinar Kholin commands one of those other armies. Like his brother, the late king, he is fascinated by an ancient text called The Way of Kings. Troubled by over-powering visions of ancient times and the Knights Radiant, he has begun to doubt his own sanity.

Across the ocean, an untried young woman named Shallan seeks to train under an eminent scholar and notorious heretic, Dalinar's niece, Jasnah. Though she genuinely loves learning, Shallan's motives are less than pure. As she plans a daring theft, her research for Jasnah hints at secrets of the Knights Radiant and the true cause of the war.

The result of over ten years of planning, writing, and world-building, 'The Way of Kings' is but the opening movement of the 'Stormlight Archive', a bold masterpiece in the making.",
        "pages":"1258",
        "release":"2011-04-24",
        "authorId":"669fb6dda31d94322bddbd60",
        "genreId":"669fb6b4bd0ac343d9321c1a"
    }
]
```

### Authors
```json
[
    {
        "name":"PierceBrown",
        "dateOfBirth":"1988-01-28",
        "about": "Pierce Elliot Brown (* 28. Januar 1988 in Denver) ist ein US-amerikanischer Science-Fiction-Autor. Brown wurde durch den Romanzyklus Red Rising bekannt, von dem inzwischen sechs Romane erschienen sind.",
        "picture": "pierceBrown.jpg",
    },
    {
        "name":"BrandonSanderson",
        "dateOfBirth":"1975-12-19",
        "about": "Brandon Sanderson (* 19. Dezember 1975 in Lincoln, Nebraska) ist ein US-amerikanischer Autor von Fantasy- und Science-Fiction-Literatur. Der überwiegende Teil seines Werkes lässt sich dem Subgenre der High Fantasy zuordnen. Bekannt wurde Sanderson vor allem durch seine Mistborn-Reihe (dt. Nebelgeboren). Er beendete den sehr populären und einflussreichen Zyklus Das Rad der Zeit, nachdem dessen Schöpfer Robert Jordan verstorben war.",
        "picture": "brandonSanderson.jpg",
    }
]
```

### Genres
```json
 [
    {
        "name":"ScienceFiction"
    },
    {
        "name":"Fantasy"
    }
]
```


mySqlPassword123!