import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://bangthe2222:bangthe2222@cluster0.irtrtus.mongodb.net/?retryWrites=true&w=majority";
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
  }

let client;
let clientPromise;

if (process.env.MONGODB_URI) {
  console.log(process.env.MONGODB_URI)
}

if (!clientPromise) {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;