var express = require("express");
var router = express.Router();
const User = require('../models/user.js');

router.post('/report', async function (req, res) {
    const { deviceKey,
        imageURL,
        severity,
        eventType
    } = req.body;

    console.log({
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
