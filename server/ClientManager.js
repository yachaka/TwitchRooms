
var	User = require('./user')
	, Client = require('./Client');

module.exports = new ClientManager();


function ClientManager() {

	var _tokens = [];
	var _clients = {};

	this.logIn = function (access_token) {
		var handle = function (response) {
			var response = response.getBody();
        	if (response.error)
        		throw new Error(response.message);
        	console.log(response)
        	_tokens[access_token] = response.name.toLowerCase();
			_clients[response.name.toLowerCase()] = new Client(response, function () {
				delete _clients[response.name];
			});
		}.bind(this);

		return User
            .me(access_token)
            .then(handle, handle);
	};

	this.isLoggedIn = function (access_token) {
		var name;
		if (!(name = _tokens[access_token]))
			return false;
		return !!_clients[name];
	};

	this.userForToken = function (access_token) {
		return this.userForName(_tokens[access_token]);
	};

	this.userForName = function (name) {
		name = name.toLowerCase();
		return _clients[name];
	};

	// this.usersForIds = function (_ids) {
	// 	return _ids.map(function (_id) {
	// 		return this.userForId(_id);
	// 	}, this);
	// };

};
