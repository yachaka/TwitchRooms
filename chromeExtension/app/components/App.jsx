
var React = require('react')
	, ReactDOM = require('react-dom');

var NotConnected = require('./NotConnected.jsx')
	, Authenticating = require('./Authenticating.jsx')
	, ConnectedRoom = require('./ConnectedRoom.jsx')

	, Socket = require('../Socket')

	, Dispatcher = require('../Dispatcher')
	, ActionsTypes = require('../../../shared/actions/Constants').Types

	, EventsSubscriberMixin = require('../mixins/EventsSubscriberMixin')(Dispatcher)

	, FriendsCookieHelper = require('../helpers/FriendsCookieHelper');


var Room = React.createClass({
	mixins: [EventsSubscriberMixin],

	getInitialState: function () {
		return {
			authenticated: null 
		};
	},
	componentWillMount: function () {
		Socket.connect();
		// Socket.io.on('connect_error', console.log.bind(console, 'Connect_error fired'));
		// Socket.io.on('connect_timeout', console.log.bind(console, 'connect_timeout fired'));
		// Socket.io.on('reconnect', console.log.bind(console, 'reconnect fired'));
		// Socket.io.on('reconnect_attempt', console.log.bind(console, 'reconnect_attempt fired'));
		// Socket.io.on('reconnecting', console.log.bind(console, 'reconnecting fired'));
		// Socket.io.on('reconnect_error', console.log.bind(console, 'reconnect_error fired'));
		// Socket.io.on('reconnect_failed', console.log.bind(console, 'reconnect_failed fired'));
		this.subscribeToEvent(ActionsTypes.SOCKET_CONNECTED, this.setState.bind(this, {authenticated: true}));
		this.subscribeToEvent(ActionsTypes.SOCKET_DISCONNECTED, this.setState.bind(this, {authenticated: false}));

		this.subscribeToEvent(ActionsTypes.FRIEND_DELETED, FriendsCookieHelper.deleteFriend);
		this.subscribeToEvent(ActionsTypes.FRIEND_ADDED, FriendsCookieHelper.addFriend);
	},

	render: function() {
		if (this.state.authenticated == null)
			return (<Authenticating/>);
		else if (this.state.authenticated == false)
			return (
				<NotConnected/>
			);
		return (
			<ConnectedRoom/>
		);
	},


	resetConnection: function () {
		this.setState({
			authenticated: null
		});

		this.state.socket.io.disconnect();
		this.state.socket.io.connect();
	}
});

window.ReactDOM = ReactDOM;
window.React = React;
window.Room = Room;
