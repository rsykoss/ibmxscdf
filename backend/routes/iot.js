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

const parser = multer({ storage: storage, limits: { fieldSize: 25 * 1024 * 1024 } });

const { bot } = require('../config/mongoose')

const generateIncident = async ({ deviceKey, imageURL, severity, eventType, eventDescription, location }) => {
    let device = await Device.findById(deviceKey)
    console.log(device)
    let newIncident = new Incident();
    newIncident.device = device;
    newIncident.severity = severity ? severity : 'Major';
    newIncident.eventDescription = eventDescription ? eventDescription : 'A kitchen is burning!';
    newIncident.imageURL = imageURL ? imageURL : ''
    newIncident.eventType = eventType ? eventType : 'Fire'
    newIncident.careReceiver = device.careReceiver;

    if (location) {
        newIncident.location = location
    }

    await newIncident.save();

    let users = await User.aggregate([
        {
            $match: {
                telegramState: 'Neutral',
                locations: {
                    $elemMatch: {
                        latitude: {
                            $gt: newIncident.location.latitude - 2 / 55,
                            $lt: newIncident.location.latitude + 2 / 55
                        },
                        longitude: {
                            $gt: newIncident.location.longitude - 2 / 55,
                            $lt: newIncident.location.longitude + 2 / 55
                        }
                    }
                }
            }
        }]
    )

    users.forEach((u) => {
        bot.sendMessage(u.telegramId, "#" + newIncident._id + ": " + newIncident.eventDescription, {
            "reply_markup": {
                "keyboard": [["/help " + newIncident._id], ["I don't care."]]
            }
        });
        bot.sendLocation(u.telegramId, newIncident.location.latitude, newIncident.location.longitude);
    })
}

router.get('/report', async (req, res) => {
    let receiver = await Receiver.findOne({name: 'Hock Chuan'})
    let deviceKey
    if (true) {
        let product = await Product.findOne({}).lean()
        let device = new Device();
        device.deviceType = product.deviceType;
        device.product = product
        device.careReceiver = receiver;
        await device.save();
        receiver.devices.push(device);
        receiver.save();
        deviceKey = device._id
    } else {
        deviceKey = receiver.devices[0]
    }

    console.log('device key ' + deviceKey)

    generateIncident({ deviceKey, imageURL: '', severity: '', eventType: '', eventDescription: '', location: '' })
    res.json({ success: true })
})

router.post('/report', parser.any(), async function (req, res) {
    const { deviceKey,
        severity,
        eventType,
        eventDescription,
        location
    } = req.body;
    const image = req.files.length > 0 ? req.files[0].secure_url : '';
    generateIncident({
        deviceKey,
        eventDescription,
        imageURL: image,
        severity,
        eventType,
        location
    })
    res.json({ success: true })
});

router.get('/fetchAllDevices', async function (req, res) {
    const { id } = req.params;
    // localhost:3000
    // localhost:3000?id=12345566

    
    let careReceiver;
    if (id) {
        careReceiver = await Receiver.findById(id).populate({ path: 'devices', model: 'Device', populate: { path: 'product', model: "Product" } })

    } else {
        careReceiver = await Receiver.findOne({name: 'Hock Chuan'}).populate({ path: 'devices', model: 'Device', populate: { path: 'product', model: "Product" } })
    }

    res.json({
        success: true,
        name: careReceiver.name,
        age: 88,
        gender: 'Male',
        address: 'Nanyang Technological',
        devices: careReceiver.devices.map(d => {
            return {
                id: id,
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
    const { deviceType, id } = req.body;
    console.log(deviceType);

    let careReceiver = await Receiver.findById(id ? id : '5ee59ad8365aea6fa2596826')

    let product = await Product.findOne({ deviceType }).lean()

    if (!product) {
        res.json({ success: false })
        return;
    }

    let device = new Device();
    device.deviceType = deviceType;
    device.product = product
    device.careReceiver = careReceiver;
    device.save();

    careReceiver.devices.push(device);
    careReceiver.save();

    res.json({
        success: true,
        newDevice: {
            type: device.deviceType,
            deviceKey: device._id,
            title: product.title,
            description: product.description,
            imageURL: product.imageURL,
        }
    })
});

router.post('/registerProduct', async function (req, res) {
    const { title, description, creatorURL, imageURL, deviceType } = req.body;
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
