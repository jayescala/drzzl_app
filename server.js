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
  // Login Page
app.post("/login", async (req, res) => {
  const loginUsername = Users.find({username: req.body.username});
  if(loginUsername === true){
    if(bcrypt.compareSync(req.body.password, username.password)){
      req.session.username = req.body.username;
      req.session.loggedIn = true;
      req.session.message = "";
      res.redirect("/");
    } else {
      req.session.message = "The password you have entered is incorrect.";
      res.redirect("/login");
    }
  } else {
    req.session.message = "The username you had entered does not match any existing accounts.";
    res.redirect("/login");
  }
});

// Port Setup
const port = 3000.
app.listen(port, () => {
  const timestamp = (new Date(Date.now())).toLocaleString();
  console.log(timestamp + ": running on port " + port);
});
