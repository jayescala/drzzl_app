// Imports
const mongoose = require("mongoose");
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/drzzl";

<<<<<<< HEAD
=======
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/partials-db";

>>>>>>> 7c3beb7254851e888e4eec7fca1798206c6d579b
mongoose.connect(mongoUri, { useNewUrlParser: true });

mongoose.connection.on("connected", () => {
  console.log("mongoose is connected");
});

mongoose.connection.on("error", (err) => {
  console.log(err, " mongoose error");
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoose is disconnected");
});
