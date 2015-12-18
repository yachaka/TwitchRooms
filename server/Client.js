
var io = require('./servers').io
	, shelpers = require('./helpers/SpaceHelpers')
	, RawToPublicInfo = require('../shared/helpers/RawToPublicInfo')

	, ActionsTypes = require('../shared/actions/Constants').Types;

function Client(twitchUserInfo, afterDisconnectCb) {
	this._id = twitchUserInfo._id;
	this._public = RawToPublicInfo(twitchUserInfo);

	this._spaces = {};

	this._afterDisconnectCb = afterDisconnectCb;
}

Client.prototype.createSpace = function (spaceName) {
	if (!this._spaces[spaceName])
		this._spaces[spaceName] = [];
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

	this._spaces[spaceName].push(socket);
	socket.join(shelpers.selfName(spaceName, socket.User._id));

	socket.on('disconnect', this.delSocketFromSpace.bind(this, socket, spaceName));
};


Client.prototype.delSocketFromSpace = function (socket, spaceName) {
	console.log('-- -- DELETING socket #'+socket.id+' from client '+this._id);
	
	this._spaces[spaceName].splice(this._spaces[spaceName].indexOf(socket), 1);
	if (this._spaces[spaceName].length == 0) {
		this.delSpace(spaceName);
	}
};

Client.prototype.disconnect = function () {
	console.log('Disconnect client ?', this._spaces)
	for (var space in this._spaces) {
		io.sockets.in(shelpers.name(space, this._id)).emit(ActionsTypes.FRIEND_DISCONNECTED, this._id);
	}
};


module.exports = Client;