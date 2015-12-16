
var io = require('./servers').io
	, shelpers = require('./helpers/SpaceHelpers')

	, ActionsTypes = require('../shared/actions/Constants').Types;

function Client(twitchUserInfo, afterDisconnectCb) {
	this._id = twitchUserInfo._id;
	this.name = twitchUserInfo.name;

	this._spaces = {};

	this._afterDisconnectCb = afterDisconnectCb;
}

Client.prototype.createSpace = function (spaceName) {
	if (!this._spaces[spaceName])
		this._spaces[spaceName] = 0;
};

Client.prototype.delSpace = function (spaceName) {
	if (Object.keys(this._spaces).length == 1) {
		this.disconnect();
		delete this._spaces[spaceName];
		this._afterDisconnectCb();
	} else
		delete this._spaces[spaceName];
};

Client.prototype.addSocketToSpace = function (socket, spaceName) {
	console.log('    Adding socket to space...');
	if (!this._spaces[spaceName])
		this.createSpace(spaceName);

	this._spaces[spaceName]++;

	socket.on('disconnect', this.delSocketFromSpace.bind(this, socket, spaceName));
};


Client.prototype.delSocketFromSpace = function (socket, spaceName) {
	console.log('-- -- DELETING socket #'+socket.id+' from client '+this.name);
	
	this._spaces[spaceName]--;
	if (this._spaces[spaceName] == 0) {
		this.delSpace(spaceName);
	}
};

Client.prototype.disconnect = function () {
	console.log('Disconnect client ?', this._spaces)
	for (var space in this._spaces) {
		io.sockets.in(shelpers.name(space, this.name)).emit(ActionsTypes.FRIEND_DISCONNECTED, this.name);
	}
};


module.exports = Client;