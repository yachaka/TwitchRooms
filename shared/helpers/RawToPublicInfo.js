
module.exports = function (twitchUserInfo) {
	
	return {
		_id: twitchUserInfo._id,
		name: twitchUserInfo.display_name,
		logo: twitchUserInfo.logo
	}	
};