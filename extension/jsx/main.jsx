
var React = require('react')
	, ReactDOM = require('react-dom');

var NotConnected = require('./NotConnected.jsx')
	, Authenticating = require('./Authenticating.jsx')
	, ConnectedRoom = require('./ConnectedRoom.jsx');


var Room = React.createClass({
	getInitialState: function () {
		return {
			socket: null,
			authenticated: null
		};
	},
	componentDidMount: function () {
		var socket = io('http://localhost:8080', {'force new connection': false, query: 'spaceName=Twitch'});
	
		/**
		* SOCKET Lifecycle Callbacks
		*****/
		socket.on('connect', function () {
			console.log('Socket successfully connected', socket.id);
			this.setState({
				authenticated: true
			});
		}.bind(this));

		socket.on('error', function (err) {
			console.error('Error:', err);
			this.setState({
				authenticated: false
			});
		}.bind(this));
		socket.on('userJoined', function (socketId) {
			console.log('user joined ', socketId);
		});



		/**
		* Custom events
		*****/
		socket.on('userConnected', function (user) {
			console.log('user connected ', user);
		});

		socket.on('Ok', function (user) {
			console.log('ok ', user);
		});

		socket.on('userDisconnected', function (user) {
			console.log('user disconnected ', user);
		});
		socket.on('no_access_token', function (data) {
			console.log('I got no no_access_token! ');
		});

		
		this.setState({
			socket: socket
		});

		window.resetTwitchRoomConnection = this.resetConnection;
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
