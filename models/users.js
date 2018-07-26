// Imports
const mongoose = require("mongoose");
const Content = require("./contents.js");
const Comment = require("./comments.js");

// Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String, required: true, unique: true
  },
  password: {
    type: String,
    hint: String,
    createdDate: { type: Date, default: Date.now },
    createdBy: String,
    modifiedDate: Date,
    modifiedBy: String
  },
  lastName: String,
  emailAddress: String,
  mobileNumber: Number,
  city: String,
  state: String,
  zip: Number,
  createdDate: { type: Date, default: Date.now },
  createdBy: String,
  modifiedDate: Date,
  modifiedBy: String,
  contents: [Content.schema],
  comments: [Comment.schema]
});

// Exports
module.exports = mongoose.model("User", userSchema);
