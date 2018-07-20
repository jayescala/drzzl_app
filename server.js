// Imports
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");

// Application
const app = express();

// mongodb Connection
require("./db/db.js");

// Middleware
  // body-parser
app.use(bodyParser.urlencoded({extended: false}));
  // method-override
app.use(methodOverride('_method'));
  // express-session
app.use(session({
  secret: "This is a random secret string that you make up",
  resave: false,
  saveUninitialized: false
}));

// Routes
  // Home Page
app.get("/", (req, res) => {
  res.render("home/home.ejs");
});

// Port Setup
const port = 3000.
app.listen(port, () => {
  const timestamp = (new Date(Date.now())).toLocaleString();
  console.log(timestamp + ": running on port " + port);
});
