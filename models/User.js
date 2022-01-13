const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    //validation
    match: [/.+@.+\..+/, "Must be an email address!"],
  },
  thoughts,
  friends,
});

const User = model("User", userSchema);

module.exports = User;
