const express = require('express');
require('./db/config');
const cors=require('cors');
const User = require('./db/User');
const app = express();
app.use(express.json());
app.use(cors());
app.post('/register',async  (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    res.send( result);
})
app.listen(5000);  
// -------------------------
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017";
const database = "e-commerce";
const client = new MongoClient(url);

async function getData() {
    let result = await client.connect();
    let db = result.db(database);
    let collection = db.collection("users");
    let response = await collection.find({}).toArray();
    console.log(response);
}
getData();