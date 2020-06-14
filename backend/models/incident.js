var mongoose = require("mongoose");

var incidentSchema = new mongoose.Schema({
    eventType: {
        type: String,
        enum: ['Fire', 'Accident', 'Health']
    },
    severity: {
        type: String,
        enum: ['Minor', 'Major']
    },
    deviceType: {
        type: String,
        enum: ['cctv', 'walkingStick']
    },
    device: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Device"
    },
    careReceiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Receiver"
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
    responders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    resolvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    resolvedAt: Date,
    cratedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Incident", incidentSchema);
