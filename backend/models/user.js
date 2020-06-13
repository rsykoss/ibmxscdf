var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    telegramId: String,
    accountKey: String,
    nric: {
        type: String,
        default: "S1234567Z"
    },
    mobile: String,
    locations: [{
        longitude: Number,
        latitude: Number
    }],
    telegramState: {
        type: String,
        enum: ['Neutral', 'Responding', 'Add Locations', 'Remove Locations']
    }
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

// { message_id: 14,
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
//     date: 1592030094,
//     location: { latitude: 1.438914, longitude: 103.803238 } }





// componentOnMount: {
//     /iot/fetchHome
//     {
//         name:
//         age:
//         gender:
//         address:
//         devices: [{
//             type: String, // cctv, walkingStick,
//             deviceKey: String
//         }]
//     }
// }


// FIRST HALF

// Name:
// .....

// SECOND HALF

//     // 2 buttons: 
// / iot / registerDevice
// requestBody: {
//     deviceType: String // cctv, walkingStick
// }

// responseBody: {
//     type: String, // cctv, walkingStick,
//         deviceKey: String
// }

// list of your registered iot devices
// card that shows cctv
