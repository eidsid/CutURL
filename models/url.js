const mongoose = require("mongoose");
const Str = require('@supercharge/strings')

const url = mongoose.Schema({
    fullURL: {
        type: String,
        required: true,
        minLength: 10
    },
    shortURL: {
        type: String,
        default: ''
    },
    clicks: {
        type: Number,
        default: 0
    },
    CreatedAt: {
        type: Date,
        default: Date.now()
    }
});

url.pre('save', async function() {
    if (this.shortURL === '') {
        this.shortURL = await Str.random(7)
    }
})
module.exports = mongoose.model("URLS", url);