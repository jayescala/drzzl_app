// Imports
const express = require("express");

// Models
const Contents = require("../models/contents.js");
const Users = require("../models/users.js");
const Comments = require("../models/comments.js");

// Router
const router = express.Router();

// Routes
  // Render Index Page
router.get("/", async (req, res) => {
  const foundContents = await Contents.find({});
  res.render("content/index.ejs", {
    contents: foundContents
  });
});
  // Render New Page
router.get("/create", (req, res) => {
  res.render("content/new.ejs");
});
  // Render Show Page
router.get("/:id", async (req, res) => {
  const foundContent = await Contents.findById(req.params.id);
  res.render("content/show.ejs", {
    content: foundContent
  });
});
  // Render Edit Page
router.get("/update/:id", async (req, res) => {
  const foundContent = await Contents.findById(req.params.id);
  res.render("content/edit.ejs", {
    content: foundContent
  });
});
  // Create Content
router.post("/", async (req, res) => {
  const newContent = req.body;
  newContent.createdBy = req.session.username;

  const createdContent = await Contents.create(newContent);

  const foundUser = await Users.findById(req.body.userId);
  foundUser.contents.push(createdContent);
  foundUser.save();

  res.redirect("/content");
});
  // Update Content
router.put("/:id", async (req, res) => {
  const newContent = req.body;
  newContent.modifiedBy = req.session.username;
  newContent.modifiedDate = Date.now;

  const updatedContent = await Contents.findByIdAndUpdate(req.params.id, newContent, {new: true});

  res.redirect("/content");
});
  // Delete Content
router.delete("/:id", async (req, res) => {
    // Delete Content
  const deletedContent = await Contents.findByIdAndRemove(req.params.id);
    // Delete Content from User
  const foundContentFromUser = await Users.contents.findByIdAndRemove(req.params.id);
    // Delete Content Comments from Users
  const commentIds = [];
  for(let i = 0; i <= deletedContent.comments.length-1; i++){
    commentIds.push(deletedContent.comments[i].id);
  }
  const deletedCommentsFromUser = await Users.comments.remove({_id: { $in: commentIds}});

  res.redirect("/content");
});

// Exports
module.exports = router;
