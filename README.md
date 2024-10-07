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
- [X] Create Genre crud pages and their respective functions in the frontend
- [X] Darkmode toggle
- [X] Add database migrations
- [ ] Create DevOps for project to help plan sprints and features
- [ ] Display validation errors in the forms
- [ ] Handle upload of images with cloudinary
- [ ] Responsive design
- [ ] Make book-author and book-genre many-to-many
- [ ] List of 10 books by genre
- [ ] Toggle list or grid
- [ ] Filterable booklist
- [ ] Filter Authorlist by timespan of birthdate
- [ ] Create an appealing Landing page
- [ ] Logging
- [ ] Login
- [ ] Add a series property to Books
- [ ] Add a Bookmarking system
- [ ] Add a Rating sytem
- [ ] Add a shopping cart
- [ ] Language picker

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
        "id": "string",
        "cover": "string",
        "name": "string",
        "description": "string",
        "pages": "number",
        "release": "date",
        "authorId": "string",
        "genreId": "string"
    }
]
```

### Authors
```json
[
    {
        "id": "string",
        "name": "string",
        "dateOfBirth": "date",
        "about": "string",
        "picture": "string",
    }
]
```

### Genres
```json
 [
    {
        "id": "string",
        "name": "string"
    }
]
```

## Packages for backend
In this section i list the packages i used in the backend and explain why i did so.  

### express
This is a framework i use to create the server and handle the api requests from the frontend.  
https://www.npmjs.com/package/express

### express-validator
This package contains express middleware that validates express requests.
https://www.npmjs.com/package/express-validator

### cors
This package enables cors for http requests. Whithout it all the calls would get blocked by cors.  
https://www.npmjs.com/package/cors

### dotenv
With this package i can use environment vaiables. This helps me to hide passwords and database connections inside the code. They also dont get uploaded to git.  
https://www.npmjs.com/package/dotenv

### uuid
This package generates the uuids for the database entries.  
https://www.npmjs.com/package/uuid

### mongodb
This package handles the connection to the mongodb database.  
https://www.npmjs.com/package/mongodb

### mysql2
This package handles the connection to the mysql database. I use this over the standard mysql-package beacause it is a more advanced version.  
https://www.npmjs.com/package/mysql2

### sequelize
This package is an ORM(object-relational mapping) tool. It allows the creation of models, migrations and seeders.  
This way i can create a picture of the database in my project code and handle changes.  
https://www.npmjs.com/package/sequelize

### sequelize-cli
This package allows me to create models, migrations and seeders from the command line.  
I can also run them this way.  
https://www.npmjs.com/package/sequelize-cli

#### reseed
This is a custom script that undoes all migrations then runs them again and finally runs the seeders.
```bash
npm run reseed
```

#### models
creating a model:  
```bash
npx sequelize-cli model:generate --name < Model Name > --attributes < List of Attributes(firstName:string,...) >
```  

#### migrations
generating a migration:
```bash
npx sequelize-cli migration:generate --name < Migration Name >
```  

running a migration:
```bash
npx sequelize-cli db:migrate
```  

undoing a migration:
```bash
npx sequelize-cli db:migrate:undo

npx sequelize-cli db:migrate:undo:all
```  

#### seeds
generating seeds:
```bash
npx sequelize-cli seed:generate --name < Seed Name >
```  

running seeds:
```bash
npx sequelize-cli db:seed:all
```  

undoing seeds:
```bash
npx sequelize-cli db:seed:undo

npx sequelize-cli db:seed:undo --seed < Seed Name >

npx sequelize-cli db:seed:undo:all
```  