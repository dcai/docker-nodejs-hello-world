const express = require("express");
const os = require("os");
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "0.0.0.0";
const app = express();
app.get("*", (req, res) => {
  const hostname = os.hostname();
  res.json({
    data: {
      message: "hello world",
      hostname
    }
  });
});
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
