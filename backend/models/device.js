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
});

module.exports = mongoose.model("Device", deviceSchema);

