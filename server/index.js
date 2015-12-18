
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
var cg = require('./config/config')
    , shelpers = require('./helpers/SpaceHelpers')
    , Client = require('./Client')
    , ClientManager = require('./ClientManager')

    , ActionsTypes = require('../shared/actions/Constants').Types;

/**
 * Bootstrapping
 */
server.listen(8080);



/****************************/
/*****    EXPRESS    ********/
/****************************/

/** Express Middlewares **/
express.use(expressRequire.static('../chromeExtension/public/'));

/**
 * Express Routing, to serve html pages
 */
express.get('/', function (req, res) {
    res.sendFile(__dirname + '/dev2.html');
});

/** Twitch login redirect **/
express.get('/twitch_redirect', function (req, res) {
    res.sendFile(__dirname + '/views/twitchRedirect.html');
});



/******************************/
/*****    SOCKET.IO    ********/
/******************************/

/** Socket.IO Middlewares **/
io.use(function (socket, next) {
    socket.conn.on('close', function() {console.log('DISCONNECT LOL.');});
    console.log('\n\n\n------ New socket, socket.io : ', socket.id, socket.handshake);
    cookieParser(socket.handshake, {}, next);
});
    /** Authentification */
io.use(function (socket, next) {

    /** No space name */
    if (!socket.handshake.query.spaceName)
        return next(new Error('No query.spaceName'));
    socket.spaceName = socket.handshake.query.spaceName;

    /** No access token */
    if (!socket.handshake.query.access_token)
        return next(new Error('No Access Token'));
    socket.access_token = socket.handshake.query.access_token;

    if (!ClientManager.isLoggedIn(socket.access_token))
        return ClientManager
            .logIn(socket)
            .then(next, function (err) {
                console.log(err.stack);
                next(err);
            });

    next();
});
    //
io.use(function (socket, next) {
    socket.User = ClientManager.userForToken(socket.access_token);
    console.log('  - User logged in ! Name :', socket.User._id, 'with socket', socket.id);

    /** Setting socket to space */
    socket.User.addSocketToSpace(socket, socket.spaceName);


    /**
    * Joining friends rooms for status updates
    */
    var friendsConnected = {};
    if (socket.handshake.query.friends) {
        var friendIds, u;
        try {
            friendIds = JSON.parse(socket.handshake.query.friends);
            for (var i = 0; i < friendIds.length; i++) {
                joinRoom(socket, socket.spaceName, friendIds[i]);
                if (u = ClientManager.userForId(friendIds[i]))
                    friendsConnected[friendIds[i]] = u._public;
            }

            socket.emit(ActionsTypes.INITIAL_FRIENDS_PAYLOAD, friendsConnected);
        } catch (e) {
        }

    }

    socket.to(shelpers.name(socket.spaceName, socket.User._id)).emit(ActionsTypes.FRIEND_CONNECTED, socket.User._public);

    next();
});
io.use(function (socket, next) {
    if (socket.conn.readyState == 'closed' || socket.conn.readyState == 'closing') {
        socket.disconnect();
        return (next(new Error('Socket closed')));
    }
    next();
})

/**
 * Sockets events
 */
io.on('connection', function (socket) {
    console.log('    ', 'IO connection handler, clients: ', Object.keys(io.engine.clients));

    socket.on(ActionsTypes.DELETE_FRIEND, function (friendId) {
        console.log('-- Got asked to DELETE friend ', friendId);
        leaveRoom(socket, socket.spaceName, friendId);
        socket.emit(ActionsTypes.FRIEND_DELETED, friendId);

        if (u = ClientManager.userForId(friendId))
            socket.emit(ActionsTypes.FRIEND_DISCONNECTED, friendId);
    });

    socket.on(ActionsTypes.ADD_FRIEND, function (friendId) {
        console.log('++ Got asked to ADD friend ', friendId);
        joinRoom(socket, socket.spaceName, friendId);
        socket.emit(ActionsTypes.FRIEND_ADDED, friendId);

        if (u = ClientManager.userForId(friendId)){
            console.log('friend is logged on : ', u)
            socket.emit(ActionsTypes.FRIEND_CONNECTED, u._public);
        }
    });
});

/**
 * Sockets callback
 */

/**
 * Join a room (identified by the spaceName + the clientId)
 */
function joinRoom(socket, spaceName, friendId) {
    socket.join(shelpers.name(spaceName, friendId));
}

/**
 * Leaves a room (identified by the spaceName + the clientId)
 */
 function leaveRoom(socket, spaceName, friendId) {
    socket.join(shelpers.name(spaceName, friendId));
}