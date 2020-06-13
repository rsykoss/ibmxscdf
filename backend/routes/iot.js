var express = require("express");
var fs = require("fs")
var router = express.Router();
const User = require('../models/user.js');
const Incident = require('../models/incident.js');
const Device = require('../models/device.js');
var multer = require('multer');

const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: 'rsykoss',
    api_key: '979912435841532',
    api_secret: 'lo7EhZCAyKYyJ4z0SJ5FeVg0c5k'
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "hackathon",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
});

// multer({ limits: { fieldSize: 25 * 1024 * 1024 } })
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './public/storage');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname + ".png");
//     }
// });

const parser = multer({ storage: storage, limits: { fieldSize: 25 * 1024 * 1024 } });

const { bot } = require('../config/mongoose')

const generateIncident = async ({ deviceKey, imageURL, severity, eventType }) => {
    let key = deviceKey ? deviceKey : '5ee4bad674ca5538cfb3b4a7';
    let device = await Device.findById(key)
    let newIncident = new Incident();
    newIncident.device = device;
    newIncident.severity = 'Severe';
    newIncident.eventDescription = 'An old woman shat herself.';
    // newIncident.location = { longitude: device.location.longitude, latitude: device.location.latitude };
    newIncident.imageURL = imageURL ? imageURL : device.imageURL
    newIncident.eventType = eventType ? eventType : device.eventType
    newIncident.save();
    bot.sendMessage('42402078', newIncident.eventDescription, {
        "reply_markup": {
            "keyboard": [["I'm on it."], ["I don't care."]]
        }
    });
}


const uploads = multer({
    storage: storage
}).single('image');

router.get('/report', async (req, res) => {
    generateIncident({})
    res.json({ success: true })
})

router.post('/report', parser.any(), async function (req, res) {
    const { deviceKey,
        severity,
        eventType
    } = req.body;
    console.log('test image');
    const image = req.files.length > 0 ? req.files[0].secure_url : 'no image found';
    console.log(image);
    generateIncident({
        deviceKey,
        imageURL: image,
        severity,
        eventType
    })
    res.json({ success: true })
});

router.get('/fetchAllDevices', async function (req, res) {
    // const { deviceType } = req.body;

    let devices = await Device.find({})
    console.log(devices);
    res.json({
        success: true,
        name: 'Hock Chuan',
        age: 88,
        gender: 'Male',
        address: 'Nanyang Technological',
        devices: devices.map(d => {
            return {
                type: d.deviceType,
                deviceKey: d._id
            }
        })
    });
})

router.post('/registerDevice', async function (req, res) {
    const { deviceType } = req.body;
    console.log(deviceType);
    let device = new Device();
    device.deviceType = deviceType;
    device.save();
    res.json({
        success: true, newDevice: {
            type: device.deviceType,
            deviceKey: device._id
        }
    })
});

module.exports = router;
