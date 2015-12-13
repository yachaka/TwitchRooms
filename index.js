
/**
 * VENDORS
 */
var servers = require('./servers')
    , expressRequire = servers.expressRequire
    , express = servers.express
    , cookieParser = require('cookie-parser')()
    , requestify = require('requestify')
    , server = servers.httpServer
    , io = servers.io
    , fs = require('fs');


/**
 * Internal dependencies
 */
var cg = require('./config')
    , shelpers = require('./SpaceHelpers')
    , Client = require('./Client')
    , ClientManager = require('./ClientManager');

/**
 * Bootstrapping
 */
server.listen(8080);



/****************************/
/*****    EXPRESS    ********/
/****************************/

/** Express Middlewares **/
express.use(expressRequire.static('extension'));

/**
 * Express Routing, to serve html pages
 */
express.get('/', function (req, res) {
    res.sendFile(__dirname + '/dev.html');
});

/** Twitch login redirect **/
express.get('/twitch_redirect', function (req, res) {
    res.sendFile(__dirname + '/twitchRedirect.html');
});



/******************************/
/*****    SOCKET.IO    ********/
/******************************/

/** Socket.IO Middlewares **/
io.use(function (socket, next) {
    cookieParser(socket.handshake, {}, next);
});
    /** Authentification */
io.use(function (socket, next) {
    var token = socket.handshake.cookies['access_token'];

    /** No access token */
    if (!socket.handshake.query.spaceName)
        return next(new Error('No query.spaceName'));
    /** No access token */
    if (!token)
        return next(new Error('No Access Token'));
    if (!ClientManager.isLoggedIn(token))
        return ClientManager
            .logIn(token)
            .then(next, function (err) {
                console.log(err.stack);
                next(err);
            });
    next();
});
    //
io.use(function (socket, next) {
    socket.access_token = socket.handshake.cookies['access_token'];
    socket.spaceName = socket.handshake.query.spaceName;

    socket.User = ClientManager.userForToken(socket.access_token);

    console.log('User logged in ! ID :', socket.User._id);

    /** Setting socket to space */
    socket.User.addSocketToSpace(socket, socket.spaceName);

    /**
    * Joining friends rooms for status updates
    */
    if (socket.handshake.cookies['friends']) {
        var friendIds;
        try {
            friendIds = JSON.parse(socket.handshake.cookies['friends']);
        } catch (e) {next(e)};

        for (var i = 0; i < friendIds.length; i++) {
            socket.join(shelpers.name(socket.spaceName, friendIds[i]));
        }
    }

    socket.to(shelpers.name(socket.spaceName, socket.User._id)).emit('userConnected', socket.User._raw);

    next();
});


/**
 * Sockets events
 */
io.on('connection', function (socket) {
    socket.on('subscribe', function (room) {
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