const { MongoClient } = require("mongodb");

const useMongo = app => {
  const user = process.env.MONGO_USER;
  const pass = process.env.MONGO_PASS;
  const host = process.env.MONGO_HOST || "localhost";
  const dbName = process.env.MONGO_DB || "test";
  const collection = process.env.MONGO_COLLECTION || "data";
  const uri = `mongodb://${host}`;
  if (user && pass) {
    uri = `mongodb://${user}:${pass}@${host}`;
  }
  console.info("use mongodb", uri);
  // XXX: this is for testing only, no db singleton, reconnect for each http request
  app.get("/dbtest", (req, res) => {
    const mongo = new MongoClient(uri, { useUnifiedTopology: true });
    mongo.connect((err, client) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Connected to mongo: ${uri}`);
      const db = client.db(dbName);
      const col = db.collection(collection);
      const record = { timestamp: Date.now() };

      col.insertOne(record, (err, r) => {
        if (err) {
          console.error(err);
          return;
        }
        const { insertedCount } = r;
        col.find().toArray((err, result) => {
          if (err) {
            console.error(err);
            return;
          }
          col.deleteMany({ timestamp: { $gt: 0 } }, (err, r) => {
            if (err) {
              console.error(err);
              return;
            }
            const { deletedCount } = r;
            res.json({ result, deletedCount, insertedCount });
            client.close();
          });
        });
      });
    });
  });
};

module.exports = {
  useMongo
};
