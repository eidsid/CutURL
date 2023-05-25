const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name must be provided"],
  },
  email: {
    type: String,
    required: [true, "email must be provided"],
  },
  password: {
    type: String,
    required: [true, "password must be provided"],
  },
  urls: {
    type: Array(mongoose.SchemaTypes.ObjectId),
    ref: "URLS",
    default: [],
  },
});
module.exports = mongoose.model("Users", userSchema);
