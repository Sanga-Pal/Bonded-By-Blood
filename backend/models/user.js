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
  city: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
    // unique: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  loc: { type: { type: String }, coordinates: [Number] },
});
userSchema.path("contact").validate(async (contact) => {
  const ct=await mongoose.models.User.countDocuments({
    contact,
  });
  return !ct;
}, "Contact Exists");
userSchema.path("email").validate(async (email) => {
  const ct=await mongoose.models.User.countDocuments({
    email,
  });
  return !ct;
}, "Email Exists");

userSchema.index({ loc: "2dsphere" });
const User = new mongoose.model("User", userSchema);

module.exports = User;
