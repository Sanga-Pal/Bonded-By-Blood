const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
const MONGODB_URI = process.env.MONGODB_URI;
app.listen(process.env.PORT || 8000, async () => {
  //Connect to MongoDB
  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
      if (err) {
          console.log(err);
      }
      else {
          console.log("Mongo DB connected successfully!");
      }
  });
  console.log(`Listening at port ${process.env.PORT || 8000}`);
});