var express = require("express");
var router = express.Router();
const User = require('../models/user.js');
const Incident = require('../models/incident.js');

const Device = require('../models/device.js');
const { bot } = require('../config/mongoose')

const generateIncident = async ({ deviceKey, imageURL, severity, eventType }) => {
    let key = deviceKey ? deviceKey : '5ee4bad674ca5538cfb3b4a7';
    let device = await Device.findById(key)
    let newIncident = new Incident();
    newIncident.device = device;
    newIncident.severity = severity ? severity : device.severity
    newIncident.eventDescription = 'An old woman shat herself.';
    newIncident.location = { longitude: device.longitude, latitude: device.latitude };
    newIncident.imageURL = imageURL ? imageURL : device.imageURL
    newIncident.eventType = eventType ? eventType : device.eventType
    newIncident.save();
    bot.sendMessage('42402078', newIncident.eventDescription, {
        "reply_markup": {
            "keyboard": [["I'm on it."], ["I don't care."]]
        }
    });
}

router.get('/report', async (req, res) => {
    generateIncident({})
    res.json({success: true})
})

router.post('/report', async function (req, res) {
    const { deviceKey,
        imageURL,
        severity,
        eventType
    } = req.body;

    generateIncident({
        deviceKey,
        imageURL,
        severity,
        eventType
    })
    res.json({ success: true })
});

router.get('/fetchAllDevices', async function (req, res) {
    // const { deviceType } = req.body;

    let devices = await Device.find({})

    res.json({
        success: true,
        name: 'Zong Han',
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
