var mongoose = require("mongoose");

var receiverSchema = new mongoose.Schema({
    name: String,
    devices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Device"
    }]
});

module.exports = mongoose.model("Receiver", receiverSchema);

