// Imports
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const request = require("superagent");

// Application
const app = express();

// mongodb Connection
require("./db/db.js");

// app.use((req, res, next) => {
//   next();
// });

// Middleware
  // body-parser
app.use(bodyParser.urlencoded({extended: false}));
  // method-override
app.use(methodOverride('_method'));
// express-session
app.use(session({secret: "max", resave: false, saveUninitialized: false}));

// Controllers
  // user
const userController = require("./controllers/userController.js");
app.use("/user", userController);
  // content
const contentController = require("./controllers/contentController.js");
app.use("/content", contentController);

// Static Routes
  // styles
app.use("/css", express.static("css"));
  // images
app.use("/images", express.static("images"));
  // scripts
app.use("/scripts", express.static("scripts"));

// Routes
  // Home Page
app.get("/", (req, res) => {
  res.render("home/home.ejs");
});

// APIs
  // IP-API
app.get("/ip", (req, res) => {
  request
    .get("http://ip-api.com/json")
    .end((err, data) => {
      res.json(JSON.parse(data.text));
  });
});
  // Open Weather
    // Current Weather Data
app.get("/openweather/current/:city", (req, res) => {
  const appid = "a0780696d685b485af6974df3e8011b7";
  const units = "imperial";
  request
    .get("http://api.openweathermap.org/data/2.5/weather?q=" + req.params.city + "&appid=" + appid + "&units=" + units)
    .end((err, data) => {
      res.json(JSON.parse(data.text));
  });
});
  // Forecast Weather Data
app.get("/openweather/forecast/:city", (req, res) => {
  const appid = "a0780696d685b485af6974df3e8011b7";
  const units = "imperial";
  request
    .get("http://api.openweathermap.org/data/2.5/forecast?q=" + req.params.city + "&appid=" + appid + "&units=" + units)
    .end((err, data) => {
      res.json(JSON.parse(data.text));
  });
});

// Port Setup
const port = 3000;
app.listen(port, () => {
  const timestamp = (new Date(Date.now())).toLocaleString();
  console.log(timestamp + ": running on port " + port);
});
