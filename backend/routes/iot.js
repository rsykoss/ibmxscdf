var express = require("express");
var fs = require("fs")
var router = express.Router();
const User = require('../models/user.js');
const Incident = require('../models/incident.js');
const Device = require('../models/device.js');
const Product = require('../models/product.js');
const Receiver = require('../models/carereceiver.js');
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

const generateIncident = async ({ deviceKey, imageURL, severity, eventType, eventDescription }) => {
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
        eventType,
        eventDescription
    } = req.body;
    console.log('test image');
    const image = req.files.length > 0 ? req.files[0].secure_url : 'no image found';
    console.log(image);
    generateIncident({
        deviceKey,
        eventDescription,
        imageURL: image,
        severity,
        eventType
    })
    res.json({ success: true })
});

router.get('/fetchAllDevices', async function (req, res) {
    const { userid } = req.body;
    console.log(req.body)
    let careReceiver = await Receiver.findById(userid ? userid : '5ee55bf1e51b411a29f81915').populate({ path: 'devices', model: 'Device', populate: { path: 'product', model: "Product" } })

    res.json({
        success: true,
        name: careReceiver.name,
        age: 88,
        gender: 'Male',
        address: 'Nanyang Technological',
        devices: careReceiver.devices.map(d => {
            return {
                userid: userid,
                type: d.deviceType,
                deviceKey: d._id,
                title: d.product.title,
                description: d.product.description,
                imageURL: d.product.imageURL,
            }
        })
    });
})

router.get('/fetchAllProducts', async function (req, res) {
    // const { deviceType } = req.body;

    let products = await Product.find({}).lean()
    res.json({
        success: true,
        products
    });
})


router.post('/registerDevice', async function (req, res) {
    const { deviceType, userid } = req.body;
    console.log(deviceType);
    let product = await Product.findOne({ deviceType }).lean()
    if (!product) {
        res.json({ success: false })
        return;
    }
    let device = new Device();
    device.deviceType = deviceType;
    device.product = product
    device.save();
    res.json({
        success: true, newDevice: {
            userid: userid,
            type: device.deviceType,
            deviceKey: device._id,
            title: product.title,
            description: product.description,
            imageURL: product.imageURL,
        }
    })
});

router.post('/registerProduct', async function (req, res) {
    // title: String,
    // description: String,
    // creatorURL: String,
    // deviceType: {
    //     type: String,
    //     enum: ['cctv', 'walkingStick']
    // },
    const { title, description, creatorURL, imageURL, deviceType } = req.body;
    console.log({ title, description, creatorURL, deviceType });
    let product = new Product();
    product.title = title;
    product.description = description;
    product.creatorURL = creatorURL;
    product.imageURL = imageURL;
    product.deviceType = deviceType;
    await product.save();
    res.json({
        success: true
    })
});

module.exports = router;
