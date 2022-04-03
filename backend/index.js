var express = require("express");
var app = express();
app.listen(3000, () => {
  console.log("Listening on port 3000");
});

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, () => {
  console.log("Connected to Mongo DB Successfully!!");
});
