var express = require('express');
var app = express();
var router = express.Router();
const API = require('../lib/API');
const axios = require('axios');

var videos = [];

router.get('/:type/:id/:cursor?', function(req, res, next) {
    var cursor = req.params.cursor;
    var request_url = "https://api.twitch.tv/helix/videos";
    var type = req.params.type === "game" ? "game_id" : "user_id";
    var id = req.params.id;

    request_url += "?" + type + "=" + id;

    if (cursor) {
        request_url += "&after=" + cursor;
    }

    axios.get(request_url, {
        headers: API.headers()
    })
    .then((response) => {
        videos = response.data;
        res.send(videos);
    })
    .catch((error) => {
        console.log(error);
    });

    
});

module.exports = router;
