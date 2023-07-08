const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://karan147369:aZ6oMQnIzbNM7N6M@cluster0.qysrln0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

module.exports = client;
