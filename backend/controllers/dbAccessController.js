const { MongoClient, ServerApiVersion } = require('mongodb');
const mysql = require('mysql2');
require('dotenv').config();
const constants = require('../constants');
const Sequelize = require('sequelize');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise();

const uri = constants.MONGODB_LOCAL ? process.env.MOGNO_DB_LOCAL : process.env.MONGO_DB_ATLAS;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

module.exports = { client, pool };