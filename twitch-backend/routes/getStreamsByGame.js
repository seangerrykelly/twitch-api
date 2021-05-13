var express = require('express');
var app = express();
var router = express.Router();
const API = require('../lib/API');
const axios = require('axios');

var streams = [];

router.get('/:id/:cursor?', function(req, res, next) {
    var cursor = req.params.cursor;
    var id = req.params.id;
    var request_url = "https://api.twitch.tv/helix/streams?game_id=" + id;
    
    if (cursor) {
        request_url += "&after=" + cursor;
        console.log(request_url);
    }

    axios.get(request_url, {
        headers: API.headers()
    })
    .then((response) => {
        streams = response.data;
        res.send(streams);
    })
    .catch((error) => {
        console.log(error);
    });

    
});

module.exports = router;
