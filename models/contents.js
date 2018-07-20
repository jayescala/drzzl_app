// Import
const mongoose = require("mongoose");
const Comment = require("./comments.js");

// Schema
const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
  createdDate: { type: Date, default: Date.now },
  createdBy: String,
  modifiedDate: Date,
  modifiedBy: String,
  comments: [Comment.Schema],
  tags: [String],
  link: String
});

// Exports
module.exports = mongoose.model("Content", contentSchema);
