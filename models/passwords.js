// Imports
const mongoose = require("mongoose");

// Schema
const passwordSchema = new mongoose.Schema({
  password: String,
  hint: String,
  // createdDate: { type: Date, default: Date.now },
  createdBy: String,
  modifiedDate: Date,
  modifiedBy: String
});

// Exports
module.exports = mongoose.model("Password", passwordSchema);
