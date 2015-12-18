
var io = require('socket.io-client');

var Dispatcher = require('./Dispatcher')
	, ActionsTypes = require('../../shared/actions/Constants').Types;

function Socket() {
	this.accessToken = null;
	this.friends = null;

	this.s = null;
};

Socket.prototype.setAccessToken = function (accessToken) {
	this.accessToken = accessToken;
	return this;
};

Socket.prototype.setFriends = function (friends) {
	this.friends = friends;
	return this;
};

Socket.prototype.createConnection = function () {
	this.s = io('http://localhost:8080', {
		query: 'spaceName=Twitch&access_token='+this.accessToken+'&friends='+JSON.stringify(this.friends),
		forceNew: true,
		autoConnect: false
	});

	/**
	* SOCKET Lifecycle Callbacks
	*****/
	this.s.on('connect', Dispatcher.emit.bind(Dispatcher, ActionsTypes.SOCKET_CONNECTED));
	this.s.on('error', Dispatcher.emit.bind(Dispatcher, ActionsTypes.SOCKET_DISCONNECTED));

	/**
	* SOCKET Custom Events
	*****/
	this.s.on(ActionsTypes.FRIEND_CONNECTED, Dispatcher.emit.bind(Dispatcher, ActionsTypes.FRIEND_CONNECTED));
	this.s.on(ActionsTypes.FRIEND_DISCONNECTED, Dispatcher.emit.bind(Dispatcher, ActionsTypes.FRIEND_DISCONNECTED));
	this.s.on(ActionsTypes.INITIAL_FRIENDS_PAYLOAD, Dispatcher.emit.bind(Dispatcher, ActionsTypes.INITIAL_FRIENDS_PAYLOAD));

	this.s.on(ActionsTypes.FRIEND_ADDED, Dispatcher.emit.bind(Dispatcher, ActionsTypes.FRIEND_ADDED));
	this.s.on(ActionsTypes.FRIEND_DELETED, Dispatcher.emit.bind(Dispatcher, ActionsTypes.FRIEND_DELETED));

	/**
	 * Exposed to window function to reset the connection
	 */
	function resetConnection () {
		this.s.io.disconnect();
		this.s.io.connect();
	}
	window.resetTwitchRoomConnection = resetConnection;

};

module.exports = new Socket();