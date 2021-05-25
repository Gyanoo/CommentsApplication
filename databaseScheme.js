const mongoose = require("mongoose");

const comment = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: () => new Date(),
    },
});

module.exports = mongoose.model("Comment", comment);
