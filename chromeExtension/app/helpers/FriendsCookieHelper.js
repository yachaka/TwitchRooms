
var COOKIE_NAME = 'friends';
var COOKIE_DAYS = 365;

function _getCookie() {
	return JSON.parse(getCookie(COOKIE_NAME));
}
function _writeCookie(newValue) {
	setCookie(COOKIE_NAME, JSON.stringify(newValue), COOKIE_DAYS);
}

module.exports = {
	
	replaceFriends: function (newFriends) {
		_writeCookie(newFriends);
	},

	addFriend: function (friendId) {
		var friends = _getCookie() || [];

		friends.push(friendId);
		friends = friends.filter(function (value, index, array) { return array.indexOf(value) === index; });
		_writeCookie(friends);
	},

	deleteFriend: function (friendId) {
		var friends = _getCookie(), i;

		if ((i = friends.indexOf(friendId)) != -1)
			friends.splice(i, 1);
		friends.filter(function (value, index, array) { return array.indexOf(value) === index; });
		_writeCookie(friends);
	}
};