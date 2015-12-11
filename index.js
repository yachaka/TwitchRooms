
/**
 * VENDORS
 */
var expressRequire = require('express')
    , express = expressRequire()
    , cookieParser = require('cookie-parser')()
    , requestify = require('requestify')
    , server = require('http').Server(express)
    , io = require('socket.io')(server)
    , fs = require('fs');


/**
 * Internal dependencies
 */
var cg = require('./config')
    , ClientManager = require('./ClientManager');


/**
 * Bootstrapping
 */
server.listen(80);

/** Express Middlewares **/
express.use(expressRequire.static('client'));
/** Socket.IO Middlewares **/
io.use(function (socket, next) {
    console.log(socket.handshake);
    cookieParser(socket.handshake, {}, next);
});
io.use(function (socket, next) {
    var token = socket.handshake.cookies['access_token'];
    socket.access_token = token;
    if (!token)
        return next(new Error('No Access Token'));
    else if (!ClientManager.isLoggedIn(token))
        return ClientManager
            .logIn(token)
            .then(next, next);
    next();
});



/**
 * Routing
 */
express.get('/', function (req, res) {
    res.sendFile(cg.paths.client_dir + '/client.html');
});

/** Twitch login redirect **/
express.get('/twitch_redirect', function (req, res) {
    res.sendFile(cg.paths.client_dir + '/twitchRedirect.html');
});


/**
 * Sockets events
 */
io.on('connection', function (socket) {
    console.log(socket.access_token);
    socket.on('join', function (room) {
        if (socket.room)
            socket.leave(socket.room, socketLeaveRoom.bind(null, socket));

        socket.join(room);
        socket.room = room;
        socket.to(room).emit('userJoined', socket.id);
    });

    socket.on('disconnect', socketLeaveRoom.bind(null, socket));
});

/**
 * Sockets callback
 */

 function socketLeaveRoom (socket) {
    socket.to(socket.room).emit('userLeaved', socket.id);
 }