const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/ , "Please enter a valid email address"],
    unique: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
    min: [1, "Height cannot be less than 1"],
  },
  weight: {
    type: Number,
    required: true,
    min: [1, "Weight cannot be less than 1"],
  },
  loc: { type: { type: String }, coordinates: [Number] },
});
userSchema.path("contact").validate(async (contact) => {
  const ct = await mongoose.models.User.countDocuments({
    contact,
  });
  return !ct;
}, "Contact Exists");
userSchema.path("email").validate(async (email) => {
  const ct = await mongoose.models.User.countDocuments({
    email,
  });
  return !ct;
}, "Email Exists");

userSchema.index({ loc: "2dsphere" });
const User = new mongoose.model("User", userSchema);

module.exports = User;
