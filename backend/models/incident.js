var mongoose = require("mongoose");

var incidentSchema = new mongoose.Schema({
    eventType: {
        type: String,
        enum: ['fire', 'accident']
    },
    deviceType: {
        type: String,
        enum: ['cctv', 'walkingStick']
    },
    device: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Device"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    severity: {
        type: String,
        enum: ['Minor', 'Major', 'Severe']
    },
    eventDescription: String,
    location: {
        longitude: Number,
        latitude: Number
    },
    imageURL: String,
    respondents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

module.exports = mongoose.model("Incident", incidentSchema);
