
var expressRequire = require('express')
    , express = expressRequire()
    , server = require('http').Server(express)
    , io = require('socket.io')(server);

module.exports = {
	expressRequire: expressRequire,
	express: express,
	httpServer: server,
	io: io
};