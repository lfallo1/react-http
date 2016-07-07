var Fetch = require('whatwg-fetch');
var baseUrl = 'http://localhost:6069';

var checkStatus = function(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
};

var parseJSON = function(response) {
    return response.json()
};

var service = {

    get : function(url){
        return fetch(baseUrl + url)
            .then(checkStatus)
            .then(parseJSON);
    }

};

module.exports = service;