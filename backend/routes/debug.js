var express = require("express");
var router = express.Router();
const User = require('../models/user.js');
const Device = require('../models/device.js');
const { bot } = require('../config/mongoose')


router.get('/simulateReport', async function (req, res) {
    bot.sendMessage('42402078', 'test', {
        "reply_markup": {
            "keyboard": [["I'm on it."], ["I don't care."]]
        }
    });
    res.json({ success: true })
});

router.get('/populateFakeUser', async function (req, res) {
    let user = new User();
    user.accountKey = 'zonghan';
    user.mobile = '90066259';
    await user.save();
    res.json({ user })
});


router.get('/allUsers', async function (req, res) {
    let user = await User.find({})
    res.json({ user })
});

router.get('/allDevices', async function (req, res) {
    let devices = await Device.find({})
    res.json({ devices })
});


router.get('/resetUsers', async function (req, res) {
    let user = await User.deleteMany({})
    res.json({ user })
});


router.post('/createUser', async function (req, res) {
    let user = new User();
    user.accountKey = new Date().getTime()
    await user.save();
    res.json({ success: true, secret: user.accountKey })
});

router.get('/createDevice', async (req, res) => {
    let device = new Device();
    device.deviceType = 'walkingStick';
    device.save();
    res.json({
        success: true, newDevice: {
            type: device.deviceType,
            deviceKey: device._id
        }
    })
})


module.exports = router;
