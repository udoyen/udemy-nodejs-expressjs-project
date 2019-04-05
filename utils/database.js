const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    "mongodb+srv://george:udemy_321@udemycluster-bb3gw.mongodb.net/shop?retryWrites=true",
    {
      userNewUrlParser: true
    }
  )
    .then(client => {
      console.log("Connected");
      _db = client.db();
      callback(); // This is where the app.listen(3000) is called!
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
