
var requestify = require('requestify');


function login (session, access_token) {
    return requestify.get('https://api.twitch.tv/kraken/user?oauth_token='+access_token)
        .then(function (response) {
            session.user = response.getBody();
            session.access_token = access_token;
        });
}

module.exports = {
	login: login
};