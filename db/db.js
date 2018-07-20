const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/drzzl");

mongoose.connection.on("connected", () => {
  console.log("mongoose is connected");
});

mongoose.connection.on("error", (err) => {
  console.log(err, " mongoose error");
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoose is disconnected");
});
