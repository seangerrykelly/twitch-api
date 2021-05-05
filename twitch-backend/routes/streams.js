var express = require('express');
var app = express();
var router = express.Router();
const API = require('../lib/API');
const axios = require('axios');

var streams = [];

axios.get("https://api.twitch.tv/helix/streams", {
        headers: API.headers()
    })
    .then((response) => {
        streams = response.data;
    })
    .catch((error) => {
        console.log(error);
    })

router.get('/', function(req, res, next) {
    res.send(streams);
});

module.exports = router;
