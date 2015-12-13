
var io = require('./servers').io
	, shelpers = require('./SpaceHelpers');

function Client(twitchUserInfo, afterDisconnectCb) {
	this._id = twitchUserInfo._id;
	this._raw = twitchUserInfo;

	this._spaces = {};

	this._afterDisconnectCb = afterDisconnectCb;
}

Client.prototype.createSpace = function (spaceName) {
	if (!this._spaces[spaceName])
		this._spaces[spaceName] = 0;
};

Client.prototype.delSpace = function (spaceName) {
	if (Object.keys(this._spaces).length == 1) {
		console
		this.disconnect();
		this._afterDisconnectCb();
	}
	
	delete this._spaces[spaceName];
};

Client.prototype.addSocketToSpace = function (socket, spaceName) {
	if (!this._spaces[spaceName])
		this.createSpace(spaceName);

	this._spaces[spaceName]++;

	socket.on('disconnect', this.delSocketFromSpace.bind(this, socket, spaceName));
};

// Client.prototype.hydrateSubscriptions = function (newSubscriptions) {
// 	this._subscriptions = this._subscriptions.concat(newSubscriptions).filter(function (value, index, self) {return self.indexOf(value) === index;});
// };

// /**
//  * Self sockets ***
//  **/
// Client.prototype.addSelfSocket = function (socket) {
// 	console.log('-- -- Adding socket #'+socket.id+' to client '+this._id+ ', space '+socket.space.name);
	
// 	this._spaces[socket.space.name].sockets.push(socket);
// 	socket.join(this._spaces[socket.space.name].selfRoom);

// 	socket.on('disconnect', this.delSelfSocket.bind(this, socket));
// };

Client.prototype.delSocketFromSpace = function (socket, spaceName) {
	console.log('-- -- DELETING socket #'+socket.id+' from client '+this._id);
	
	this._spaces[spaceName]--;
	if (this._spaces[spaceName] == 0) {
		this.delSpace(spaceName);
	}
};

Client.prototype.disconnect = function () {
	console.log('Disconnect client ?', this._spaces)
	for (var space in this._spaces) {
		io.sockets.in(shelpers.name(space, this._id)).emit('userDisconnected', this._raw);
	}

	this._afterDisconnectCb();
};

// /**
//  * Subscription methods ***
//  **/
// Client.prototype.subscribe = function (socket) {
// 	console.log('-- -- Socket #' + socket.id + ' subscribed to client ' + this._id + ' !')
// 	socket.join(this._statusRoom);
// };

// Client.prototype.unsubscribe = function (socket) {
// 	socket.leave(this._statusRoom);
// };

module.exports = Client;