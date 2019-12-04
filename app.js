const express = require("express");
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "0.0.0.0";
const app = express();
app.get("/", (req, res) => {
  res.send("<html><body><h1>Hello world</h1></body></html>");
});
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
