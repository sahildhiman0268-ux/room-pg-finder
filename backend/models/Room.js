const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  rent: {
    type: Number,
    required: true,
  },

  owner: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Room", roomSchema);