const client = require('./dbAccessController');

async function create() {
    try {
        await client.connect();


    } finally {
        await client.close();
    }
}
async function read() {
    try {
        await client.connect();

        return await client.db("Bookshop").collection("Books").find().toArray();
    } finally {
        await client.close();
    }
}

async function update() {
    try {
        await client.connect();


    } finally {
        await client.close();
    }

}

async function deleteObj() {
    try {
        await client.connect();


    } finally {
        await client.close();
    }

}

module.exports = { create, read, update, deleteObj }