// Imports
const require = require("express");
const bcrypt = require("bcrypt");

// Router
const router = express.Router;

// Models
const Users = require("../models/users.js");

// Routes
  // Render Index Page
router.get("/", (req, res) => {
  const foundUsers = await Users.find({});
  res.render("user/index.ejs", {
    users: foundUsers
  });
});
  // Render New Page
router.get("/create", (req, res) => {
  res.render("user/new.ejs");
});
  // Render Show Page
router.get("/:id", async (req, res) => {
  const foundUser = await Users.findById(req.params.id);
  res.render("user.show.ejs", {
    users: foundUsers
  });
});
  // Render Edit Page
router.get("/update/:id", async (req, res) => {
  const foundUser = await Users.findById(req.params.id);
  res.render("user/edit.ejs", {
    user: foundUser
  });
});
  // Create User
router.post("/", async (req, res) => {
  const userEntry = {};

  const username = req.body.username;
  const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

  const createdUser = await Users.create(req.body);
});
  // Update User
  // Delete User

// Exports
module.exports = router;
