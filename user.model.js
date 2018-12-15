const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
  email: { type: Schema.Types.String, unique: true },
  username: String,
  password: String
});

const usermodel = mongoose.model("users", userSchema);

module.exports = usermodel;
