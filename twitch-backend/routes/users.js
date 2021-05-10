var express = require('express');
var app = express();
var router = express.Router();
const API = require('../lib/API');
const axios = require('axios');

var users = [];

axios.get("https://api.twitch.tv/helix/users?id=59299632", {
        headers: API.headers()
    })
    .then((response) => {
        users = response.data;
    })
    .catch((error) => {
        console.log(error);
    })

router.get('/', function(req, res, next) {
    res.send(users);
});

module.exports = router;