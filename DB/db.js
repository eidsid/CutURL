const mongoose = require("mongoose");

const connectDB = () => {
  return mongoose.connect(
      "mongodb+srv://eid:123@learnnodeexpressdb.76ext.mongodb.net/URIS?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    .then(() => {
      console.log("connected to db");
    });
};

module.exports = connectDB;
