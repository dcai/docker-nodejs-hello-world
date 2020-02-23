const express = require("express");
const os = require("os");
const { useMongo } = require("./mongo");

const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

const app = express();
const hostname = os.hostname();

app.get("/", (req, res) => {
  res.json({
    data: {
      message: "hello world",
      hostname
    }
  });
});

const mongoEnabled = parseInt(process.env.USE_MONGO) === 1;
if (mongoEnabled) {
  useMongo(app);
}

app.get("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

app.listen(port, host, () => {
  console.log(`Running on http://${host}:${port}`);
});
