
var React = require('react');

var Bubble = require('./Bubble.jsx')

	, Dispatcher = require('../Dispatcher')
	, ActionsCreator = require('../actions/ActionsCreator')
	, ActionsTypes = require('../../../shared/actions/Constants').Types

	, DispatcherSubscriberMixin = require('../mixins/EventsSubscriberMixin')(Dispatcher)

	, FriendsDB = require('../FriendsDB');

var User = React.createClass({
	mixins: [DispatcherSubscriberMixin],

	getInitialState: function () {
		return {
			data: {},
			bubbles: false,
			deleting: false
		};
	},
	componentDidMount: function () {
		FriendsDB.getFriend(this.props.friendName, function (err, data) {
			if (data)
				this.setState({
					data: data
				});
		}.bind(this));

		this.subscribeToEvent(ActionsTypes.DELETING_FRIEND, function (friendName) {
			if (this.props.friendName == friendName)
				this.setState({deleting: true});
		}.bind(this));
	},
	toggleBubbles: function (e) {
		e.preventDefault();
		var b = this.state.bubbles;

		this.setState({
			bubbles: !b
		});

		var self = this;
		var _click = function () {
			self.setState({
				bubbles: false
			});
			window.removeEventListener('click', _click);
		};
		window.addEventListener('click', _click);
	},

	deleteAsFriend: function () {
		ActionsCreator.deleteFriend(this.props.friendName);
	},

	render: function () {
		var u = this.state.data,
			avatar = u.logo || 'http://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_50x50.png',
			bubbles = null;

		if (this.state.bubbles)
			bubbles = <Bubble key="deleteBubble" onClick={this.deleteAsFriend} className="tp-close-bubble" content="✕" htmlProps={{title: "Delete as friend"}}/>;

		return (
			<div className="tp-user" onContextMenu={this.toggleBubbles}>
				<div className="tp-online"></div>
				<div className="tp-wrapper" style={{ backgroundImage: 'url(\'' + avatar + '\')', backgroundColor: this.state.deleting ? 'blue' : null }}>
				</div>
				<div className="tp-username">
					{this.props.friendName}
				</div>

				{bubbles}
			</div>
		);
	}
});

module.exports = User;