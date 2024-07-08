const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://leoreist:2aL1Jn07yeX5@cluster0.cry8wto.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

module.exports = client;