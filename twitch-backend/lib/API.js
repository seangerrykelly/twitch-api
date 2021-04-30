'use strict';

const path = require('path');
const axios = require('axios');

class API {

    static clientId() {
        return "pd4uskubwx64xt8g2m3orm4yo81kju";
    }

    static clientSecret() {
        return "vpbyv3mcuo5b9r6u6g6wykyo2ah5yo";
    }

    static headers() {
        const headers = {
            "Authorization": this.authorizationHeader(),
            "Client-Id": this.clientId()
        }
        return headers;
    }

    static generateAccessToken() {
        //axios.post('')
    }

    static authorizationHeader() {
        return "Bearer mnmjmwz28mf0r1i21p8d5bgrnv4c2i";
    }

    static getRequest() {

    }
}

module.exports = API;