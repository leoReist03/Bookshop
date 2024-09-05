# Bookshop
## Why does this project exist
This is a learning project by Leo Reist.  
The goal is to create a good website with a nodejs and express backend and a next.js frontend.
While learning node, express, nextjs and their best practices.
I specifically want to use an seperated backend because in this way i can learn more about it. I know that Next.js would allow me to do most of what i do in the backend but i want to learn and do these things myself.

## What is the concept of the website
The concept is a Bookshop called "Howler Books" with inspirations by IMDB and Amazon the plan later on is that users can rate, bookmark, and browse trough books. Only certain users should be able to edit or create them. And there should be a sort of recommendation system.

## How to use th project
First you should install node, npm and pbpm.  
Using an Nvm is also helpful, because you can have multiple versions of node on the same system and switch between the easily.  
Is use:  
- node version: v22.5.1
- npm version: 10.8.2
- pnpm version: 9.6.0
- nvm version: 1.1.12

Then you can clone the project onto your system.  
Visual Studio Code is a practical IDE for this type of project.

### to start the backend for the first time
```bash
cd ./Bookshop/backend
npm i
npm start
```

### to start the frontend for the first time
```bash
cd ./Bookshop/frontend
pnpm i
pnpm dev
```

npm i and pnpm i install the dependencies in the package.json file to your system.  
After the first start you dont have to do npm i and pnpm i anymore.  
The frontend uses pnpm because it work better and more efficiently with Next.js  

If you've done all of this, you can open any bowser you want and go to: http://localhost:3000  
Now you should be able to browse the website.

### Solving problems when starting the project
If you encounter any problems and errors when running the project you can follow these steps:  
- Delete the package-lock 

## Todolist:
- [x] Handle http get calls in the backend
- [x] Handle http post calls in the backend
- [x] Change database system to Sql
- [X] Create Book crud pages and their respective functions in the frontend
- [x] Create Author crud pages and their respective functions in the frontend
- [ ] Create DevOps for project and plan sprints and features
- [ ] Create Genre crud pages and their respective functions in the frontend
- [ ] Add database migrations
- [ ] Handle upload of images with cloudinary
- [ ] Display validation errors in the forms
- [ ] Make book-author and book-genre many-to-many
- [ ] List of 10 books by genre
- [ ] Toggle list or grid
- [ ] Filterable booklist
- [ ] Filter Authorlist by timespan of birthdate
- [ ] Create an appealing Landing page
- [ ] Logging
- [ ] Login
- [ ] Add a Bookmarking system
- [ ] Add a Rating sytem
- [ ] Add a shopping cart
- [ ] Language picker
- [ ] (Darkmode toggle)https://medium.com/@--andrewnelson/add-a-dark-mode-toggle-to-your-nextjs-react-app-375b230a4c27#c817

## Thoughts and process
In this section i talk about a few problems and decisions i encountered and the solutions i used to fix them.

### The problem with pictures:
In the current state i would need to send pictures via the url to the backend in order to save them.
Except i use a filepath but then i still need a way of saving them in the project and manual is a bad way to do that.

#### Possible solution
Cloudinary - the plan is to upload the picture to cloudinary and then saving the cloudinary public_id in the database this way i could access them via url. I would make a picture component with a list of every picture filtered by either author or book cover. The upload of a new picture would be handled in this component. To select a picture in order to create a new Author or Book instance you would just select the previously uploaded picture from the component.  
Also if you dont use a picture when creating an object it will resort to using a standard one instead.

### Mongodb or Sql
The project originally was created with mongodb in mind. But as farther into development i got, i found it more difficult to work with it. I am more used to, and fell more comfortable, with relational database-systems. Especially many-to-many relations are easier to picture and create. Also i like, and know, the syntax of sql better and i feel like mongo db is not reliable enough. There are constant errors like topic closed errors and such. These make it really hard to relliably work with it.

#### Current State
At the point of writing this, i changed the system to work with mysql. And it works way smoother than it previously ever had. But i did not remove the possibility to use mongodb. To do so, you just have to change the value of "DATABASE_SYSTEM" to "mongodb" in the file "constants.js" in the backend. In this file you can also specify if you want to use the local mongodb or the Atlas version. MySql currently only has o local version but i plan to implement a server version in the future.

### Handle database Migrations
I would like to keep track of changes to my database in my project. A good way to do this is migrations.
With the help of these i could create the changes in code and then run the migration and update the database.
This solution would also allow me to make rollbacks to a previous version easily.

#### Possible tools to use for this
TypeOrm - https://typeorm.io/migrations  
Knex - https://knexjs.org/guide/migrations.html#knexfile-in-other-languages  
PrismaORM - https://www.prisma.io/docs/orm/prisma-migrate/getting-started  


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

## Packages for backend
In this section i list the packages i used in the backend and explain why i did so.  

### express
This is a framework i use to create the server and handle the api requests from the frontend.  
https://www.npmjs.com/package/express

### cors
This package enables cors for http requests. Whithout it all the calls would get blocked by cors.  
https://www.npmjs.com/package/cors

### dotenv
With this package i can use environment vaiables. This helps me to hide passwords and database connections inside the code. They also dont get uploaded to git.  
https://www.npmjs.com/package/dotenv

### uuid
This package generates the uuids for the database entries.  
https://www.npmjs.com/package/uuid

### mysql2
This package handles the connection to the mysql database. I use this over the standard mysql-package beacause it is a more advanced version.  
https://www.npmjs.com/package/mysql2