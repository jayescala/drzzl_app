// Imports
const express = require("express");
const bcrypt = require("bcrypt");

// Router
const router = express.Router();

// Models
const Users = require("../models/users.js");
const Contents = require("../models/contents.js");
const Comments = require("../models/comments.js");

// Routes
  // Render Index Page
router.get("/", async (req, res) => {
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
  res.render("user/show.ejs", {
    user: foundUser
  });
});
  // Render Edit Page
router.get("/update/:id", async (req, res) => {
  const foundUser = await Users.findById(req.params.id);
  res.render("user/edit.ejs", {
    user: foundUser
  });
});

// Login User
router.post("/login", async (req, res) => {
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

  // Create User
router.post("/register", (req, res) => {
  const userEntry = {};
  const username = req.body.username;
  const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

  userEntry.username = username;
  userEntry.password = password;

  Users.create(userEntry, (err, user) => {
    console.log(userEntry);
    console.log(err + " - This is err.");
    console.log(user + " - This is user.");
    req.session.username = userEntry.username;
    req.session.logged = true;
    console.log(req.session);
    res.redirect("/");
  });
});
  // Update User
router.put("/:id", async (req, res) => {
  const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.redirect("/user");
});
  // Delete User
router.delete("/:id", async (req, res) => {
    // Delete User
  const deletedUser = await Users.findByIdAndRemove(req.params.id);
    // Delete User Contents
  const contentIds = [];
  for(let i = 0; i <= deletedUser.contents.length-1; i++){
    contentIds.push(deletedUser.contents[i].id);
  }
  const deletedContents = await Contents.remove({_id: { $in: contentIds}});
    // Delete User Comments
  const commentIds = [];
  for(let i = 0; i <= deletedUser.comments.length-1; i++){
    commentIds.push(deletedUser.comments[i].id);
  }
  const deletedComments = await Contents.comments.remove({_id: { $in: commentIds}});

  res.redirect("/");
});

// Exports
module.exports = router;
