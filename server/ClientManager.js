
var	User = require('./user')
	, Client = require('./Client');

module.exports = new ClientManager();


function ClientManager() {

	var _tokens = [];
	var _clients = {};

	this.logIn = function (socket) {
		var handle = function (response) {
			var response = response.getBody();
			
        	if (response.error)
        		throw new Error(response.message);
        	_tokens[socket.access_token] = response._id;
			_clients[response._id] = new Client(response, function () {
				delete _clients[response._id];
			});
		}.bind(this);

		return User
            .me(socket.access_token)
            .then(handle, handle);
	};

	this.isLoggedIn = function (access_token) {
		var _id;
		if (!(_id = _tokens[access_token]))
			return false;
		return !!_clients[_id];
	};

	this.userForToken = function (access_token) {
		return this.userForId(_tokens[access_token]);
	};

	this.userForId = function (_id) {
		return _clients[_id];
	};

	// this.usersForIds = function (_ids) {
	// 	return _ids.map(function (_id) {
	// 		return this.userForId(_id);
	// 	}, this);
	// };

};
