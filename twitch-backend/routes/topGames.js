var express = require('express');
var app = express();
var router = express.Router();
const API = require('../lib/API');
const axios = require('axios');

var games = [];

axios.get("https://api.twitch.tv/helix/games/top", {
        headers: API.headers()
    })
    .then((response) => {
        games = response.data;
    })
    .catch((error) => {
        console.log(error);
    })

router.get('/:id', function(req, res, next) {
    res.send(games);
});

module.exports = router;
