
var ClientManager = require('../ClientManager');

module.exports = function (socket, next) {

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
};