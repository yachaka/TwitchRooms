
var io = require('socket.io-client');

var Dispatcher = require('./Dispatcher')
	, ActionsTypes = require('../../shared/actions/Constants').Types;

var socket = io('http://localhost:8080', {query: 'spaceName=Twitch', autoConnect: false});

/**
* SOCKET Lifecycle Callbacks
*****/
socket.on('connect', Dispatcher.emit.bind(Dispatcher, ActionsTypes.SOCKET_CONNECTED));
socket.on('error', Dispatcher.emit.bind(Dispatcher, ActionsTypes.SOCKET_DISCONNECTED));

/**
* SOCKET Custom Events
*****/
socket.on(ActionsTypes.FRIEND_CONNECTED, Dispatcher.emit.bind(Dispatcher, ActionsTypes.FRIEND_CONNECTED));
socket.on(ActionsTypes.FRIEND_DISCONNECTED, Dispatcher.emit.bind(Dispatcher, ActionsTypes.FRIEND_DISCONNECTED));
socket.on(ActionsTypes.INITIAL_FRIENDS_PAYLOAD, Dispatcher.emit.bind(Dispatcher, ActionsTypes.INITIAL_FRIENDS_PAYLOAD));

socket.on(ActionsTypes.FRIEND_ADDED, Dispatcher.emit.bind(Dispatcher, ActionsTypes.FRIEND_ADDED));
socket.on(ActionsTypes.FRIEND_DELETED, Dispatcher.emit.bind(Dispatcher, ActionsTypes.FRIEND_DELETED));



/**
 * Exposed to window function to reset the connection
 */
function resetConnection () {
	socket.io.disconnect();
	socket.io.connect();
}
window.resetTwitchRoomConnection = resetConnection;

module.exports = socket;