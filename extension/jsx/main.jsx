
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
		// var socket = io('http://localhost:8080', {query: 'spaceName=Twitch'});
	
		// /**
		// * SOCKET Lifecycle Callbacks
		// *****/
		// socket.on('connect', function () {
		// 	console.log('Socket successfully connected', socket.id);
		// 	this.setState({
		// 		authenticated: true
		// 	});
		// }.bind(this));

		// socket.on('error', function (err) {
		// 	console.error('Error:', err);
		// 	this.setState({
		// 		authenticated: false
		// 	});
		// }.bind(this));
		
		
		// this.setState({
		// 	socket: socket
		// });

		// window.resetTwitchRoomConnection = this.resetConnection;
	},

	render: function() {
		// if (this.state.authenticated == null)
		// 	return (<Authenticating/>);
		// else if (this.state.authenticated == false)
		// 	return (
		// 		<NotConnected/>
		// 	);
		return (
			<ConnectedRoom socket={this.state.socket}/>
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
