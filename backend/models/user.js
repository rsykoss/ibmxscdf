var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    telegramId: Number,
    accountKey: String,
    mobile: String, 
    locations: [{
        longitude: Number,
        latitude: Number
    }]
});

module.exports = mongoose.model("User", userSchema);

// { message_id: 8,
//     from:
//      { id: 42402078,
//        is_bot: false,
//        first_name: 'zonghan',
//        username: 'zhgoh',
//        language_code: 'en' },
//     chat:
//      { id: 42402078,
//        first_name: 'zonghan',
//        username: 'zhgoh',
//        type: 'private' },
//     date: 1592024647,
//     text: 'Woes' }