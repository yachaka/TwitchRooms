
var	User = require('./user')

module.exports = new ClientManager();


function ClientManager() {

	var _clients = [];

	this.logIn = function (access_token) {
		var handle = function (response) {
			var response = response.getBody();
        	if (response.error)
        		throw new Error(response.message);
			_clients[access_token] = response;
		};

		return User
            .me(access_token)
            .then(handle, handle);
	};

	this.isLoggedIn = function (access_token) {
		return !!_clients[access_token];
	};

	this.user = function (access_token) {
		return _clients[access_token];
	};
};
