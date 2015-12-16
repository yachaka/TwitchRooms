

function existsFriend(friendName) {
	return !!localStorage[friendName];
}

function getFriend(friendName) {
	callback(null, localStorage[friendName]);
}

function setFriend(friendName, friendData, callback) {
	callback(null, localStorage.setItem(friendName, friendData));
}

module.exports = {
	existsFriend: existsFriend,
	getFriend: getFriend,
	setFriend: setFriend
};