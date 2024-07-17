const mongo = require('mongodb');
const client = require('./dbAccessController');
const collection = client.db("Bookshop").collection("Authors");

const ObjectID = mongo.ObjectId;

async function create(name, dateOfBirth) {
    try {
        await client.connect();

        return await collection.insertOne({
            name: name,
            dateOfBirth: dateOfBirth
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

async function update(id, name, dateOfBirth) {
    try {
        await client.connect();

        return await collection.updateOne({'_id': new ObjectID(id.toString())},
        {
            $set: {
                name: name,
                dateOfBirth: dateOfBirth
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

module.exports = { create, read, find, update, deleteObj };