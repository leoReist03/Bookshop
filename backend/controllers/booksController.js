const mongo = require('mongodb');
const client = require('./dbAccessController');
const collection = client.db("Bookshop").collection("Books");

const ObjectID = mongo.ObjectId;

async function create(cover, name, description, pages, release, authorId, genreId) {
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

async function read() {
    try {
        await connect();

        return await collection.find().toArray();
    } finally {
        await close();
    }
}

async function find(id) {
    try {
        await connect();

        return await collection.find({ '_id': new ObjectID(id.toString()) }).toArray();
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

        await collection.deleteOne({ '_id': new ObjectID(id.toString()) });
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

module.exports = { create, read, find, update, deleteObj };