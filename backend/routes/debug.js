var express = require("express");
var router = express.Router();
const User = require('../models/user.js');
const Receiver = require('../models/carereceiver.js');
const Incident = require('../models/incident.js');
const Device = require('../models/device.js');
const Product = require('../models/product.js');

const { bot } = require('../config/mongoose')


router.get('/', async function (req, res) {
    // let product = await Product.findOne({imageURL: ''})
    // product.imageURL = 'https://s17026.pcdn.co/wp-content/uploads/sites/9/2016/11/protecting-businesses-161116.jpeg';
    // product.save();
    let p = await Product.find({})
    res.json({ success: p })
});


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

router.get('/populateFakeReceiver', async function (req, res) {
    let receiver = new Receiver();
    receiver.name = 'Hock Chuan';
    await receiver.save();
    res.json({ receiver })
});


router.get('/allUsers', async function (req, res) {
    let user = await User.find({})
    res.json({ user })
});

router.get('/allDevices', async function (req, res) {
    let devices = await Device.find({})
    res.json({ devices })
});

router.get('/resetAll', async function (req, res) {
    await Incident.deleteMany({})
    await User.deleteMany({})
    await Receiver.deleteMany({})
    await Device.deleteMany({})
    await Product.deleteMany({})
    res.json({ success: true })
});

router.get('/resetUsers', async function (req, res) {
    let user = await User.deleteMany({})
    res.json({ user })
});

router.get('/resetReceivers', async function (req, res) {
    let user = await Receiver.deleteMany({})
    res.json({ user })
});


router.get('/resetDevices', async function (req, res) {
    let devices = await Device.deleteMany({})
    res.json({ devices })
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
