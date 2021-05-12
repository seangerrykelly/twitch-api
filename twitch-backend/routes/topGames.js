var express = require('express');
var app = express();
var router = express.Router();
const API = require('../lib/API');
const axios = require('axios');

var games = [];

router.get('/:cursor?', function(req, res, next) {
    var cursor = req.params.cursor;
    var request_url = "https://api.twitch.tv/helix/games/top";
    
    if (cursor) {
        request_url += "?after=" + cursor;
        console.log(request_url);
    }

    axios.get(request_url, {
        headers: API.headers()
    })
    .then((response) => {
        games = response.data;
        res.send(games);
    })
    .catch((error) => {
        console.log(error);
    });

    
});

module.exports = router;
