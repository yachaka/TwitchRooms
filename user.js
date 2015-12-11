
var requestify = require('requestify');


function me(access_token) {
    return requestify.get('https://api.twitch.tv/kraken/user?oauth_token='+access_token);
}

module.exports = {
	me: me
};