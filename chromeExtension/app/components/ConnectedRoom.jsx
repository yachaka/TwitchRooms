
var React = require('react');

var User = require('./User.jsx')
	, TopBar = require('./TopBar.jsx')

	, Socket = require('../Socket')

	, Dispatcher = require('../Dispatcher')
	, ActionsCreator = require('../actions/ActionsCreator')
	, ActionsTypes = require('../../../shared/actions/Constants').Types

	, DispatcherSubscriberMixin = require('../mixins/EventsSubscriberMixin')(Dispatcher);

var socket = require('../Socket');

var ConnectedRoom = React.createClass({
	mixins: [DispatcherSubscriberMixin],

	getInitialState: function () {
		return {
			friends: {}
		};
	},

	componentWillMount: function () {
		this.subscribeToEvent(ActionsTypes.INITIAL_FRIENDS_PAYLOAD, function (friends) {
			console.log(friends, 'payload');
			this.setState({
				friends: friends
			});
		}.bind(this));

		this.subscribeToEvent(ActionsTypes.FRIEND_CONNECTED, function (friend) {
			console.log('friend connected ', friend);

			var copyFriends = JSON.parse(JSON.stringify(this.state.friends));
			copyFriends[friend._id] = friend;
			this.setState({
				friends: copyFriends
			});
		}.bind(this));

		this.subscribeToEvent(ActionsTypes.FRIEND_DISCONNECTED, function (friendId) {
			console.log('friend disconnected ', friendId);

			var copyFriends = JSON.parse(JSON.stringify(this.state.friends));
			delete copyFriends[friendId];
			this.setState({
				friends: copyFriends
			});
		}.bind(this));

	},

	render: function () {
		var friends = [];

		for (var _id in this.state.friends) {
			friends.push(<User key={_id} data={this.state.friends[_id]}/>);
		}

		return (

			<div id="tp-connectedRoom">
				<TopBar/>
				<div id="tp-userList" className="tp-bottom-section">
					{friends}
				</div>
			</div>
		);
	}
});

module.exports = ConnectedRoom;