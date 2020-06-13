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


module.exports = router;
