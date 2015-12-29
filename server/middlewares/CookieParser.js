
var cookieParser = require('cookie-parser')();

module.exports = function (socket, next) {
	cookieParser(socket.handshake, {}, next);
};