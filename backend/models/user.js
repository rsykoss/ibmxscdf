var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    telegramId: String,
    accountKey: String,
    nric: {
        type: String,
        default: "S1234567Z"
    },
    mobile: {
        type: String,
        default: "90066259"
    },
    name: {
        type: String,
        default: "Hock Chuan"
    },
    locations: [{
        longitude: Number,
        latitude: Number
    }],
    telegramState: {
        type: String,
        enum: ['Neutral', 'Responding', 'Add Locations', 'Remove Locations']
    },
    incident: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Incident"
    },
});

module.exports = mongoose.model("User", userSchema);
