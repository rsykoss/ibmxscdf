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
        enum: ['Minor', 'Major']
    },
    eventDescription: String,
    location: {
        longitude: {
            default: 103.8025,
            type: Number
        },
        latitude: {
            default: 1.4384,
            type: Number
        },
    },
    imageURL: String,
    respondents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

module.exports = mongoose.model("Incident", incidentSchema);
