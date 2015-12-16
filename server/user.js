
var requestify = require('requestify')
	, cfg = require('./config/config');


function me(access_token) {
    return requestify.get('https://api.twitch.tv/kraken/user', {
    	params: {
    		oauth_token: access_token
    	},
    	headers: {
    		"Client-ID": cfg.apis.twitch.CLIENT_ID
    	}
    });
}

module.exports = {
	me: me
};