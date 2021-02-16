export {};
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://alexbenko:phelps521@cluster0.nvy3b.mongodb.net/foodfinder?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology:true });

const data = require("../data/result.json");
client.connect(async err => {
  const collection = await client.db("foodfinder").collection("matches").remove({}).insertMany(data); //clears collection and inserts data
  // perform actions on the collection object
  console.log(collection.insertedCount)
  client.close();
});
