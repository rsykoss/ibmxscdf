var mongoose = require("mongoose");

var deviceSchema = new mongoose.Schema({
    deviceType: {
        type: String,
        enum: ['cctv', 'walkingStick']
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    careReceiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Receiver"
    },
});

module.exports = mongoose.model("Device", deviceSchema);

