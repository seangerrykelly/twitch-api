'use strict';

const path = require('path');
const axios = require('axios');

class API {

    static clientId() {
        return "<put your client id here>";
    }

    static clientSecret() {
        return "<put your client secret here>";
    }

    static headers() {
        const headers = {
            "Authorization": this.authorizationHeader(),
            "Client-Id": this.clientId()
        }
        return headers;
    }

    static authorizationHeader() {
        return "Bearer <put your access token here>";
    }

}

module.exports = API;