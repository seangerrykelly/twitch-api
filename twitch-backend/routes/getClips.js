var express = require('express');
var app = express();
var router = express.Router();
const API = require('../lib/API');
const axios = require('axios');
const { request } = require('../app');

var clips = [];

router.get('/:type/:id/:cursor?', function(req, res, next) {
    var cursor = req.params.cursor;
    var request_url = "https://api.twitch.tv/helix/clips";
    var type = req.params.type === "game" ? "game_id" : "broadcaster_id";
    var id = req.params.id;

    request_url += "?" + type + "=" + id;

    if (cursor) {
        request_url += "&after=" + cursor;
    }

    axios.get(request_url, {
        headers: API.headers()
    })
    .then((response) => {
        clips = response.data;
        res.send(clips);
    })
    .catch((error) => {
        console.log(error);
    });

    
});

module.exports = router;
