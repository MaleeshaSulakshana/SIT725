const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://mpmsulakshana:mano%4019981002@cluster0.oxaoo2y.mongodb.net/?retryWrites=true&w=majority";
const uri = "mongodb+srv://mpmsulakshana:mano%4019981002@cluster0.oxaoo2y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

client.connect();

module.exports = client;