const mongoose = require("mongoose");

const idSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  }
});

const Id = new mongoose.model("Id",idSchema);

module.exports = Id;