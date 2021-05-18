var express = require('express');
var app = express();
var router = express.Router();
const API = require('../lib/API');
const axios = require('axios');

var results = [];

router.get('/:type/:query/:cursor?', function(req, res, next) {
    var cursor = req.params.cursor;
    var type = req.params.type;
    var query = req.params.query;
    var request_url = "https://api.twitch.tv/helix/search/" + type + "?query=" + query;

    if (cursor) {
        request_url += "&after=" + cursor;
    }

    axios.get(request_url, {
        headers: API.headers()
    })
    .then((response) => {
        results = response.data;
        res.send(results);
    })
    .catch((error) => {
        console.log(error);
    });

    
});

module.exports = router;
