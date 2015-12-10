
/**
 * VENDORS
 */
var expressRequire = require('express')
    , express = expressRequire()
    , requestify = require('requestify')
    , server = require('http').Server(express)
    , session = require('express-session')({
        resave: false,
        secret: 'TwitchRooms creator is so fcuking sexy',
        saveUninitialized: false
    })
    , io = require('socket.io')(server)
    , fs = require('fs');


/**
 * Internal dependencies
 */
var cg = require('./config')
    , user = require('./user');


/**
 * Bootstrapping
 */
server.listen(80);

/** Express Middlewares **/
express.use(expressRequire.static('client'));
express.use(session);
/** Socket.IO Middlewares **/
io.use(function (socket, next) {
    session(socket.handshake, {}, next);
});


/***** // DEV  ONLY \\ *****/
/***** // DEV  ONLY \\ *****/
function autolog(session) {
    console.log('/// AUTOLOGIN');
    return user.login(session, 'mewdnr2e2a0akq5rm17fmf9srphb7y');
}
/***** // DEV  ONLY \\ *****/
/***** // DEV  ONLY \\ *****/

/**
 * Routing
 */
express.get('/', function (req, res) {
    console.log('express session', req.session);
    if (!req.session.user) {
        autolog(req.session)
        .then(function () {
            res.sendFile(cg.paths.client_dir + '/client.html');
            return ;
        });
    } else
        res.sendFile(cg.paths.client_dir + '/client.html');
});

/** Twitch login redirect **/
express.get('/twitch_redirect', function (req, res) {
    console.log('Twitch REDIRECTED !');
    console.log(req.query);

    if (req.query.code) {
        requestify.post(cg.apis.twitch.token_url, {
            client_id: cg.apis.twitch.CLIENT_ID,
            client_secret: cg.apis.twitch.CLIENT_SECRET,
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:8080/twitch_redirect',
            code: req.query.code,
            state: 'tmp_state'
        })
        .then(function (response) {
            var body = response.getBody();
            console.log('Authorization REESPONSE', body);
            return body.access_token;
        })
        .then(function (access_token) {
            return login(req.session, access_token);
        })
        .then(function () {
            res.end('Ok!');
        });
    }
});


/**
 * Sockets events
 */
io.on('connection', function (socket) {
    console.log('io session', socket.handshake.session);
    socket.on('join', function (room) {
        if (socket.room)
            socket.leave(socket.room);

        socket.join(room);
        socket.room = room;
        socket.to(room).emit('userJoined', socket.id);

        console.log('socket', socket.id, 'joined room', room);
    });

    socket.on('disconnect', function () {
    });
});