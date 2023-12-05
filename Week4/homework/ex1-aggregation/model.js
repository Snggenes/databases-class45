const mongoose = require("mongoose");

const landSchema = new mongoose.Schema({
  Country: String,
  Year: Number,
  Age: String,
  M: Number,
  F: Number,
});

const LandModel = mongoose.model('land', landSchema);

module.exports = LandModel;
