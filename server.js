// Imports
const express = require("express");
const app = express();

// mongodb Connection
require("./db/db.js");

// Port Setup
const port = 3000.
app.listen(port, () => {
  const timestamp = (new Date(Date.now())).toLocaleString();
  console.log(timestamp + ": running on port " + port);
});
