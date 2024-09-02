const mongo = require('mongodb');
const client = require('./dbAccessController');
const collection = client.db("Bookshop").collection("Authors");

const ObjectID = mongo.ObjectId;

async function create(name, dateOfBirth, picture, about) {
    try {
        await connect();

        return await collection.insertOne({
            name: name,
            dateOfBirth: dateOfBirth,
            picture: picture,
            about: about
        });
    } finally {
        await close();
    }
}

async function read() {
    try {
        await connect();

        return await collection.find().toArray().then(authors => {
            return authors.map((author) => {
                return author = {
                    id: author._id,
                    name: author.name,
                    about: author.about,
                    dateOfBirth: author.dateOfBirth,
                    picture: author.picture
                }
            })
        });
    } finally {
        await close();
    }
}

async function find(id) {
    try {
        await connect();
        
        return await collection.find({ '_id': new ObjectID(id.toString()) }).toArray().then(authors => {
            author = authors[0];
            return author = {
                id: author._id,
                name: author.name,
                about: author.about,
                dateOfBirth: author.dateOfBirth,
                picture: author.picture
            }
        });
    } finally {
        await close();
    }
}

async function update(id, name, dateOfBirth, picture, about) {
    try {
        await connect();

        return await collection.updateOne({'_id': new ObjectID(id.toString())},
        {
            $set: {
                name: name,
                dateOfBirth: dateOfBirth,
                picture: picture,
                about: about
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

async function pages() {
    try {
        await connect();

        const count = []
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

module.exports = { create, read, find, update, deleteObj, pages };