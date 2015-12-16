
var Dispatcher = require('../Dispatcher')
	, Socket = require('../Socket')

	, ActionsType = require('../../../shared/actions/Constants').Types;

module.exports = {

	addFriend: function (friendName) {
		Socket.emit(ActionsType.ADD_FRIEND, friendName);
	},

	deleteFriend: function (friendName) {
		Socket.emit(ActionsType.DELETE_FRIEND, friendName);
		Dispatcher.emit(ActionsType.DELETING_FRIEND, friendName);
	},

};