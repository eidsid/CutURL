const mongoose = require("mongoose");

const url = mongoose.Schema({
  fullURL: {
    type: String,
    required: true,
  },
  shortURL: {
    type: String,
    required: true,
    unique: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
});
url.pre("validate", function () {
  const letters = [
    "A",
    "B",
    "c",
    "d",
    "e",
    "f",
    "h",
    "g",
    "p",
    "u",
    "q",
    "w",
    "s",
    "z",
    "x",
    "v",
    "i",
    "o",
    "n",
    "k",
    "j",
    "t",
  ];
  let text = "";
  for (let i = 0; i < 7; i++) {
    const randomNum = Math.floor(Math.random() * 22);
    text += letters[randomNum];
  }
  this.shortURL = text;
});
module.exports = mongoose.model("URL", url);
