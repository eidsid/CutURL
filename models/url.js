const mongoose = require("mongoose");

const url = mongoose.Schema({
    postsid: {
        type: String,
    },
    urls: {},

});

module.exports = mongoose.model("URL", url);