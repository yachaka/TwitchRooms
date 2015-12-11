
var React = require('react')
	, ReactDOM = require('react-dom');

var NotConnected = require('./NotConnected.jsx'),
	Authenticating = require('./Authenticating.jsx');


var Room = React.createClass({
	getInitialState: function () {
		return {
			socket: null,
			authenticated: null
		};
	},
	componentDidMount: function () {
		var socket = io('http://localhost', {multiplex: false});
	
		socket.on('connect', function () {
			console.log('Socket successfully connected', socket.id);
			this.setState({
				authenticated: true
			});
		}.bind(this));

		socket.on('error', function (err) {
			console.error('Error', err);
			this.setState({
				authenticated: false
			});
		}.bind(this));

		socket.on('reconnecting', function (n) {
			console.log('Attempt', n);
			console.log(socket);
		});

		socket.emit('join', 'testRoom');
		socket.on('userJoined', function (socketId) {
			console.log('user joined ', socketId);
		});

		

		socket.on('userLeaved', function (socketId) {
			console.log('user leaved ', socketId);
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
		return (<div className="centered-p status-message">Connected</div>);
	},


	resetConnection: function () {
		this.setState({
			authenticated: null
		});

		this.state.socket.io.disconnect();
		this.state.socket.io.connect();
	}
});

ReactDOM.render(
	<Room/>,
	document.getElementById('room')
);