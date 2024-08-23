const mongo = require('mongodb');
const client = require('./dbAccessController');
const collection = client.db("Bookshop").collection("Books");

const ObjectID = mongo.ObjectId;

async function create() {
    try {
        await connect();
        
        var authors = await client.db("Bookshop").collection("Authors").find().toArray();
        var genres = await client.db("Bookshop").collection("Genres").find().toArray();

        return {authors: authors, genres: genres};
    } finally {
        await close();
    }
}

async function onCreate(cover, name, description, pages, release, authorId, genreId) {
    try {
        await connect();

        return await collection.insertOne({
            cover: cover,
            name: name,
            description: description,
            pages: pages,
            release: release,
            authorId: authorId,
            genreId: genreId
        });
    } finally {
        await close();
    }
}

async function read(itemsOnPage, pageNr) {
    try {
        await connect();

        var authors = await client.db("Bookshop").collection("Authors").find().toArray();
        var genres = await client.db("Bookshop").collection("Genres").find().toArray();

        return await collection.find({}).toArray().then(books => {
            return books.map((book) => {
                return book = {
                    id: book._id,
                    cover: book.cover,
                    name: book.name,
                    description: book.description,
                    pages: book.pages,
                    release: book.release,
                    author: authors.find(author => author._id == book.authorId).name,
                    genre: genres.find(genre => genre._id == book.genreId).name
                };
            });
        });
    } finally {
        await close();
    }
}

async function find(id) {
    try {
        await connect();
        
        var authors = await client.db("Bookshop").collection("Authors").find().toArray();
        var genres = await client.db("Bookshop").collection("Genres").find().toArray();
        
        return await collection.find({ '_id': new ObjectID(id.toString()) }).toArray().then(books => {
            book = books[0];
            return book = {
                id: book._id,
                cover: book.cover,
                name: book.name,
                description: book.description,
                pages: book.pages,
                release: book.release,
                author: authors.find(author => author._id == book.authorId).name,
                genre: genres.find(genre => genre._id == book.genreId).name
            }
        });
    } finally {
        await close();
    }
}

async function edit(id) {
    try {
        await connect();
        
        return await collection.find({ '_id': new ObjectID(id.toString()) }).toArray().then(books => {
            return books[0];
        });
    } finally {
        await close();
    }

}

async function update(id, cover, name, description, pages, release, authorId, genreId) {
    try {
        await connect();

        return await collection.updateOne({'_id': new ObjectID(id.toString())},
        {
            $set: {
                cover: cover,
                name: name,
                description: description,
                pages: pages,
                release: release,
                authorId: authorId,
                genreId: genreId
            }
        });
    } finally {
        await close();
    }
}

async function deleteObj(id) {
    try {
        await connect();

        return await collection.deleteOne({ '_id': new ObjectID(id.toString()) });
    } finally {
        await close();
    }
}

async function pages() {
    try {
        await connect();

        const count = [];
        count.push(await collection.estimatedDocumentCount());

        return count;
    } finally {
        await close();
    }
}

async function connect() {
    if (client.topology == undefined) {
        await client.connect();
    }
}

async function close() {
    if (client.topology != undefined) {
        await client.close();
    }
}

module.exports = { create, onCreate, read, find, edit, update, deleteObj, pages };