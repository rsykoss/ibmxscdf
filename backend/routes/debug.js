var express = require("express");
var router = express.Router();
const User = require('../models/user.js');

router.get('/populateFakeUser', async function (req, res) {
    let user = new User();
    user.accountKey = 'zonghan';
    user.mobile = '90066259';
    res.json({user})

});


module.exports = router;
