const { MongoClient, ServerApiVersion } = require('mongodb');

// The uri to use online db
const uri = "mongodb+srv://leoreist:2aL1Jn07yeX5@cluster0.cry8wto.mongodb.net/Bookshop?retryWrites=true&w=majority&appName=Cluster0";

// The uri to use local db
// const uri = 'mongodb://127.0.0.1:27017';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

module.exports = client;