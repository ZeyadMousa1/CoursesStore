import { MongoClient } from "mongodb";

const url = "mongodb+srv://zeyadmousa:4ApJlgCaNVfR2R2L@cluster0.sdgpisa.mongodb.net/";

const client = new MongoClient(url);

const main = async () => {
    // connect to database
    await client.connect();
    console.log('Connected Successfully to db server')
    // create db 
    const db = client.db('codezone')
    // create table
    const collection = db.collection('coureses')
    // get data
    const data = await collection.find().toArray()
    console.log(data)
}
