
var io = require('./servers').io
	, shelpers = require('./helpers/SpaceHelpers')
	, RawToPublicInfo = require('../shared/helpers/RawToPublicInfo')

	, ActionsTypes = require('../shared/actions/Constants').Types;

function TwitchUser(twitchUserInfo, afterDisconnectCb) {
	this._id = twitchUserInfo._id;
	this._public = RawToPublicInfo(twitchUserInfo);

	this._spaces = {};

	this._afterDisconnectCb = afterDisconnectCb;
}

/*****************************************************/
/** SPACES */
/**
 * Creating user space (a room)
 */
TwitchUser.prototype.createSpace = function (spaceName) {
	if (!this._spaces[spaceName])
		this._spaces[spaceName] = [];
};

/**
 * Deleting user space (a room)
 */
TwitchUser.prototype.delSpace = function (spaceName) {
	if (Object.keys(this._spaces).length == 1) {
		this.sendDisconnectedEvent();
		delete this._spaces[spaceName];
		this._afterDisconnectCb();
	} else
		delete this._spaces[spaceName];
};

/*****************************************************/
/** SOCKETS */
/**
 * New socket for user
 */
TwitchUser.prototype.addSocket = function (socket) {
	var sn = socket.spaceName;
	console.log('    .TwitchUser.addSocket('+socket.id+'), for user "'+socket.User._public.name+'"');
	if (!this._spaces[sn])
		this.createSpace(sn);

	this._spaces[sn].push(socket);
	socket.join(shelpers.selfName(sn, socket.User._id));

	socket.on('disconnect', this.delSocket.bind(this, socket));
};

/**
 * Socket disconnected for user
 */
TwitchUser.prototype.delSocket = function (socket) {
	var sn = socket.spaceName;
	console.log('    .TwitchUser.delSocket('+socket.id+'), for user "'+socket.User._public.name+'"');
	
	this._spaces[sn].splice(this._spaces[sn].indexOf(socket), 1);
	if (this._spaces[sn].length == 0) {
		this.delSpace(sn);
	}
};

/*****************************************************/
/** ROOMS */
/**
 * Join a friend (identified by ID) room for all its socket in the space (unsubscribe to its notification)
 */
TwitchUser.prototype.joinFriendRoom = function (spaceName, friendId) {
	console.log(1)
	if (!this._spaces[spaceName])
		return ;
	console.log(2)
	for (var i = 0; i < this._spaces[spaceName].length; i++) {
		console.log(3)
		this._spaces[spaceName][i].join(shelpers.name(spaceName, friendId));
	}
};

/**
 * Leave a friend (identified by ID) room for all its socket in the space (subscribe to its notification)
 */
TwitchUser.prototype.leaveFriendRoom = function (spaceName, friendId) {
	if (!this._spaces[spaceName])
		return ;
	for (var i = 0; i < this._spaces[spaceName].length; i++) {
		console.log(i)
		this._spaces[spaceName][i].leave(shelpers.name(spaceName, friendId));
	}
};

/*****************************************************/
/** Disconnection event */
TwitchUser.prototype.sendDisconnectedEvent = function () {
	console.log('    "'+this._public.name+'" User being disconnected...');
	for (var space in this._spaces) {
		io.sockets.in(shelpers.name(space, this._id)).emit(ActionsTypes.FRIEND_DISCONNECTED, this._id);
	}
};


module.exports = TwitchUser;