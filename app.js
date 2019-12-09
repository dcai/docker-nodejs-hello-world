const express = require("express");
const os = require("os");
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "0.0.0.0";
const app = express();
app.get("/", (req, res) => {
  const hostname = os.hostname();
  res.send(`<html>
        <body>
          <h1>Hello world</h1>
          <footer>hostname: ${hostname}</footer>
        </body>
        </html>`);
});
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
