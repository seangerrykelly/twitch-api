var express = require('express');
var app = express();
var router = express.Router();
const API = require('../lib/API');
const axios = require('axios');
const { request } = require('../app');

var game;

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    var request_url = "https://api.twitch.tv/helix/games?id=" + id;

    axios.get(request_url, {
        headers: API.headers()
    })
    .then((response) => {
        game = response.data.data;
        res.send(game);
    })
    .catch((error) => {
        console.log(error);
    });

    
});

module.exports = router;
