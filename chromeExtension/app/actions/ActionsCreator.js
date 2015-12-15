
var Dispatcher = require('../Dispatcher')
	, Socket = require('../Socket')

	, ActionsType = require('../../../shared/actions/Constants').Types;

module.exports = {

	addFriend: function (friendId) {
		Socket.emit(ActionsType.ADD_FRIEND, friendId);
	},

	deleteFriend: function (friendId) {
		Socket.emit(ActionsType.DELETE_FRIEND, friendId);
		Dispatcher.emit(ActionsType.DELETING_FRIEND, friendId);
	},

};