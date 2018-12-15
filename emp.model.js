const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const empSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  skills: [],
  location: {}
});

const empmodel = mongoose.model("empy", empSchema);

module.exports = empmodel;
