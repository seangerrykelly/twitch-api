var express = require('express');
var app = express();
var router = express.Router();
const API = require('../lib/API');
const axios = require('axios');
const { request } = require('../app');

var token;

router.get('/', function(req, res, next) {
    var client_id = API.clientId();
    var client_secret = API.clientSecret();
    var grant_type = "client_credentials";
    var request_url = "https://id.twitch.tv/oauth2/token?client_id="    + client_id + "&client_secret=" + client_secret 
                                                                        + "&grant_type=" + grant_type
                                                                        + "&scope=analytics:read:games";

    console.log(request_url);


    axios.post(request_url)
        .then((response) => {
            token = response.data.access_token;
            res.send(token);
        })
        .catch((error) => {
            console.log(error);
        });

    
});

module.exports = router;
