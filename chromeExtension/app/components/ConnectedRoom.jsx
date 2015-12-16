
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
			friends: []
		};
	},

	componentWillMount: function () {
		this.subscribeToEvent(ActionsTypes.INITIAL_FRIENDS_PAYLOAD, function (friendNames) {
			console.log(friendNames, 'payload');
			this.setState({
				friends: friendNames
			});
		}.bind(this));

		this.subscribeToEvent(ActionsTypes.FRIEND_CONNECTED, function (friendName) {
			console.log('friend connected ', friend);

			this.setState({
				friends: this.state.friends.concat([friendName])
			});
		}.bind(this));

		this.subscribeToEvent(ActionsTypes.FRIEND_DISCONNECTED, function (friendName) {
			console.log('friend disconnected ', friendName);

			var newFriends = this.state.friends.slice();
			newFriends.slice(newFriends.indexOf(friendName), 1);

			this.setState({
				friends: newFriends
			});
		}.bind(this));

	},

	render: function () {
		var friends = [];

		this.state.friends.forEach(function (value) {
			friends.push(<User key={value} friendName={value}/>);
		});

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