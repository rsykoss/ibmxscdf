var express = require("express");
var fs = require("fs")
var router = express.Router();
const User = require('../models/user.js');
const Device = require('../models/device.js');
var multer = require('multer');
multer({limits: { fieldSize: 25 * 1024 * 1024 }})
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/storage');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname+".png");
    }
  });
const uploads = multer({
    storage: storage 
}).single('image');

router.post('/report', uploads, async function (req, res) {
    const { deviceKey,
        severity,
        eventType
    } = req.body;
    const image = req.file
    console.log({
        deviceKey,
        severity,
        eventType,
        image
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
