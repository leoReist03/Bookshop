const { MongoClient, ServerApiVersion } = require('mongodb');
const mysql = require('mysql2');
require('dotenv').config();
const constants = require('../constants');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE_NAME
}).promise();

var uri;
if (constants.MONGODB_LOCAL) {
  uri = process.env.MOGNO_DB_LOCAL;
} else {
  uri = process.env.MONGO_DB_ATLAS;
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

module.exports = { client, pool };