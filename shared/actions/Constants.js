
var keymirror = require('keymirror');

var types = keymirror({
	SOCKET_CONNECTED: null,
	SOCKET_DISCONNECTED: null,
	
	FRIEND_CONNECTED: null,
	FRIEND_DISCONNECTED: null,
	INITIAL_FRIENDS_PAYLOAD: null,

	DELETE_FRIEND: null,
	DELETING_FRIEND: null,
	FRIEND_DELETED: null,

	ADD_FRIEND: null,
	ADDING_FRIEND: null,
	FRIEND_ADDED: null
});

module.exports = {
	Types: types
};