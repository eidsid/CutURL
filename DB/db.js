const mongoose = require("mongoose");

const connectDB = () => {
  return mongoose
    .connect(process.env.dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to db");
    });
};

module.exports = connectDB;
