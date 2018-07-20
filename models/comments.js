// Imports
const mongoose = require("mongoose");

// Schema
const commentSchema = new mongoose.Schema({
  body: String,
  createdDate: { type: Date, default: Date.now },
  createdBy: String,
  modifiedDate: Date,
  modifiedBy: String
});

// Exports
module.exports = model("comment", commentSchema);
