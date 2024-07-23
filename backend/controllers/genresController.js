const mongo = require('mongodb');
const client = require('./dbAccessController');
const collection = client.db("Bookshop").collection("Genres")

const ObjectId = mongo.ObjectId;

async function create(name) {
    try {
        await connect();

        return await collection.insertOne({
            name: name
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
        
        return await collection.find({ '_id': new ObjectId(id.toString()) }).toArray().then(genres => {
            return genres[0];
        });
    } finally {
        await close();
    }
}

async function update(id, name) {
    try {
        await connect();

        return await collection.updateOne({ '_id': new ObjectId(id.toString())},
    {
        $set: {
            name: name
        }
    });
    } finally {
        await close();
    }
}

async function deleteObj(id) {
    try {
        await connect();

        await collection.deleteOne({ '_id': new ObjectId(id.toString()) });
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