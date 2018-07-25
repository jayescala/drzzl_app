// Imports
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const request = require("superagent");

// Models
const User = require("./models/users.js");

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

// Static Routes
  // css
app.use("/css", express.static("css"));
  // images
app.use("/images", express.static("images"));

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

http://api.ipinfodb.com/v3/ip-city/?key=YOUR_API_KEY&ip=IP_V4_OR_IPV6_ADDRESS
// APIs
  // InfoDB API
app.get("/infodb", (req, res) => {
  const key = "85ea4177bfdf145e9d00b7fae23a7811e96a900028ea937a021f0d263e482c5f";
  const ip = "12.106.183.66";
  request
    .get("http://api.ipinfodb.com/v3/ip-city/?key=" + key)
    .end((err, data) => {
      console.log(data.text);
      res.json(JSON.parse(data.text));
  });
});
  // Open Weather API
    // Current Weather Data
app.get("/openweather/:city", (req, res) => {
  const key = "a0780696d685b485af6974df3e8011b7";
  request
    .get("http://api.openweathermap.org/data/2.5/weather?q=" + req.params.city + "&appid=" + key)
    .end((err, data) => {
      res.json(JSON.parse(data.text));
  });
});

// Port Setup
const port = 3000.
app.listen(port, () => {
  const timestamp = (new Date(Date.now())).toLocaleString();
  console.log(timestamp + ": running on port " + port);
});
