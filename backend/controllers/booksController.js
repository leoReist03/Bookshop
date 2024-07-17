const mongo = require('mongodb');
const client = require('./dbAccessController');
const collection = client.db("Bookshop").collection("Books");

const ObjectID = mongo.ObjectId;

async function create(cover, name, description, pages, release, authorId, genreId) {
    try {
        await client.connect();

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
        await client.close();
    }
}

async function read() {
    try {
        await client.connect();

        return await collection.find().toArray();
    } finally {
        await client.close();
    }
}

async function find(id) {
    try {
        await client.connect();

        return await collection.find({ '_id': new ObjectID(id.toString()) }).toArray();
    } finally {
        await client.close();
    }
}

async function update(id, cover, name, description, pages, release, authorId, genreId) {
    try {
        await client.connect();

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
        await client.close();
    }
}

async function deleteObj(id) {
    try {
        await client.connect();

        await collection.deleteOne({ '_id': new ObjectID(id.toString()) });
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

module.exports = { create, read, find, update, deleteObj };