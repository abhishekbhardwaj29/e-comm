// const express = require('express')
// const app = express()
// const mongoose = require('mongoose')

// const port = 4000

// mongoose.connect('mongodb://localhost:27017/CUED_Nodejs')
// const product = new mongoose.Schema({})
// const item = mongoose.model("curd", product)

// module.exports = item


// const { MongoClient } = require('mongodb');
// const url = 'mongodb://localhost:27017'; // Your MongoDB connection string
// const dbName = 'CUED_Nodejs'; // Your MongoDB database name
// const collectionName = 'curd'; // Your MongoDB collection name
// const client = new MongoClient(url)

// async function getData() {
//     let result = await client.connect()
//     let db = result.db(dbName)
//     return db.collection(collectionName)
// }

// module.exports = getData

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/E-Comm');

// // Define the schema for the "curd" collection
// const productSchema = new mongoose.Schema({
//   id: String,
//   Name: String,
//   Address: String,
// });

// // Define the model for the "curd" collection
// const Product = mongoose.model('Data', productSchema);