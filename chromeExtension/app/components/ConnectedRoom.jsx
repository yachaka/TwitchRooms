
var React = require('react');

var User = require('./User.jsx')
	, TopBar = require('./TopBar.jsx')

	, Dispatcher = require('../Dispatcher')
	, ActionsCreator = require('../actions/ActionsCreator')
	, ActionsTypes = require('../../../shared/actions/Constants').Types

	, DispatcherSubscriberMixin = require('../mixins/EventsSubscriberMixin')(Dispatcher);

var ConnectedRoom = React.createClass({
	mixins: [DispatcherSubscriberMixin],

	getInitialState: function () {
		return {
			friends: {}
		};
	},

	componentDidMount: function () {
		this.subscribeToEvent(ActionsTypes.INITIAL_FRIENDS_PAYLOAD, function (friends) {
			console.log(friends, 'payload');
			this.setState({
				friends: friends
			});
		}.bind(this));

		this.subscribeToEvent(ActionsTypes.FRIEND_CONNECTED, function (friend) {
			console.log('friend connected ', friend);

			var state = this.state;
			state.friends[friend._id] = friend;

			this.setState(state);
		}.bind(this));

		this.subscribeToEvent(ActionsTypes.FRIEND_DISCONNECTED, function (friendId) {
			console.log('friend disconnected ', friendId);

			var state = this.state;
			delete state.friends[friendId];

			this.setState(state);
		}.bind(this));

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