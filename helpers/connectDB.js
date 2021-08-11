const { MongoClient } = require("mongodb");

 const url = "mongodb://localhost:27017";
 const client = new MongoClient(url);

 const databaseName = "user-management";

 async function connectDb() {
   await client.connect();
   console.log("Connected successfully to database");
   const db = client.db(databaseName);
   return db;
 }

 module.exports = connectDb;