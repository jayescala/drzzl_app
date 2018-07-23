// Imports
const require = require("express");
const bcrypt = require("bcrypt");

// Models
const Users = require("../models/users.js");
const Contents = require("../models/contents.js");
const Comments = require("../models/comments.js");

// Router
const router = express.Router;

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
  // Create User
router.post("/", async (req, res) => {
  const userEntry = {};
  const username = req.body.username;
  const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

  const createdUser = await Users.create(userEntry);
  req.session.username = createdUser.username;
  req.session.logged = true;
  res.redirect("/");
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
