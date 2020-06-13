var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    title: String,
    description: String,
    creatorURL: String,
    imageURL: String,
    deviceType: {
        type: String,
        enum: ['cctv', 'walkingStick']
    },
});

module.exports = mongoose.model("Product", productSchema);

