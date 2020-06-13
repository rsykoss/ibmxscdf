var express = require("express");
var router = express.Router();
const User = require('../models/user.js');

router.get('/populateFakeUser', async function (req, res) {
    let user = new User();
    user.accountKey = 'zonghan';
    user.mobile = '90066259';
    await user.save();
    res.json({user})
});


router.get('/allUsers', async function (req, res) {
    let user = new User();
    user.accountKey = 'zonghan';
    user.mobile = '90066259';
    user.save();
    res.json({user})
});


module.exports = router;
