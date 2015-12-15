
var React = require('react')
	, ReactDOM = require('react-dom');

var NotConnected = require('./NotConnected.jsx')
	, Authenticating = require('./Authenticating.jsx')
	, ConnectedRoom = require('./ConnectedRoom.jsx')

	, Dispatcher = require('../Dispatcher')
	, ActionsTypes = require('../../../shared/actions/Constants').Types

	, EventsSubscriberMixin = require('../mixins/EventsSubscriberMixin')(Dispatcher)

	, FriendsCookieHelper = require('../helpers/FriendsCookieHelper');


var socket = require('../Socket');

var Room = React.createClass({
	mixins: [EventsSubscriberMixin],

	getInitialState: function () {
		return {
			authenticated: null
		};
	},
	componentWillMount: function () {
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
