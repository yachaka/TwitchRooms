
var React = require('react');

var User = require('./User.jsx')
	, TopBar = require('./TopBar.jsx');

var ConnectedRoom = React.createClass({

	getInitialState: function () {
		var friends = {};
		for (var i = 0; i < 1; i++) {
			friends[i] = { display_name: 'wp_yachStyle',
				  _id: 59152099,
				  name: 'wp_yachstyle',
				  type: 'user',
				  bio: null,
				  created_at: '2014-03-18T04:23:48Z',
				  updated_at: '2015-11-13T18:21:39Z',
				  logo: null,
				  _links: { self: 'https://api.twitch.tv/kraken/users/wp_yachstyle' },
				  email: 'ihermellin@hotmail.com',
				  partnered: false,
				  notifications: { push: false, email: true } };
		}
		return {
			friends: friends
		};
	},

	componentDidMount: function () {
		// var socket = this.props.socket;

		// socket.on('friendConnected', function (friend) {
		// 	console.log('friend connected ', friend);

		// 	var state = this.state;
		// 	state.friends[friend._id] = friend;

		// 	this.setState(state);
		// }.bind(this));

		// socket.on('friendDisconnected', function (friend) {
		// 	console.log('friend disconnected ', friend);

		// 	var state = this.state;
		// 	delete state.friends[friend._id];

		// 	this.setState(state);
		// }.bind(this));

		// socket.on('initialFriendsConnected', function (friends) {
		// 	console.log(friends);
		// 	this.setState({
		// 		friends: friends
		// 	});
		// }.bind(this));
	},

	render: function () {
		var friends = [];

		for (var key in this.state.friends) {
			friends.push(<User data={this.state.friends[key]}/>);
		}

		return (

			<div id="tp-connectedRoom">
				<TopBar/>
				<div id="tp-userList">
					{friends}
				</div>
			</div>
		);
	}
});

module.exports = ConnectedRoom;