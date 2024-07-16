const mongo = require('mongodb');
const client = require('./dbAccessController');
const books = client.db("Bookshop").collection("Books");

const ObjectID = mongo.ObjectId;

async function create(cover, name, description, pages, release, authorId, genreId) {
    try {
        await client.connect();

        return await books.insertOne({
            cover: cover,
            name: name,
            description: description,
            pages: pages,
            release: release,
            authorId: authorId,
            genreId: genreId
        });
    } finally {
        await client.close();
    }
}

async function read() {
    try {
        await client.connect();

        return await books.find().toArray();
    } finally {
        await client.close();
    }
}

async function find(id) {
    try {
        await client.connect();
        console.log(id);

        return await books.find({ '_id': new ObjectID(id.toString()) }).toArray();
    } finally {
        await client.close();
    }
}

async function update(id, cover, name, description, pages, release, authorId, genreId) {
    try {
        await client.connect();

        return await books.updateOne({'_id': new ObjectID(id.toString())},
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
        await client.close();
    }
}

async function deleteObj(id) {
    try {
        await client.connect();
        await books.deleteOne({ '_id': new ObjectID(id.toString()) });
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
}

/*
try {
    //....
} finally {
    await client.close();
}

This sometimes throws: MongoTopologyClosedError: Topology is closed

Problem: client.close() runs before the code in the try has run.
*/

module.exports = { create, read, find, update, deleteObj }