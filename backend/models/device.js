var mongoose = require("mongoose");

var deviceSchema = new mongoose.Schema({
    deviceType: {
        type: String,
        enum: ['cctv', 'walkingStick']
    },
    eventType: String
});

module.exports = mongoose.model("Device", deviceSchema);

