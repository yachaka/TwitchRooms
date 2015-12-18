
var Dispatcher = require('../Dispatcher')
	, Socket = require('../Socket')

	, ActionsType = require('../../../shared/actions/Constants').Types;

module.exports = {

	addFriend: function (friendId) {
		Socket.s.emit(ActionsType.ADD_FRIEND, friendId);
		chrome.storage.sync.get('friends', function (friends) { 
			if (!friends.length)
				friends = [];
			friends.push(friendId);
			friends.filter(function (v, i, a) {return a.indexOf(v) === i;});
			chrome.storage.sync.set({friends: friends});
		});
	},

	deleteFriend: function (friendId) {
		Socket.s.emit(ActionsType.DELETE_FRIEND, friendId);
		chrome.storage.sync.get('friends', function (friends) { 
			if (!friends.length)
				friends = [];
			friends.splice(friends.indexOf(friendId), 1);
			friends.filter(function (v, i, a) {return a.indexOf(v) === i;});
			chrome.storage.sync.set({friends: friends});
		});

		// Dispatcher.emit(ActionsType.DELETING_FRIEND, friendId);
	},

};