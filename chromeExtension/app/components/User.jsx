
var React = require('react');

var Bubble = require('./Bubble.jsx')

	, Dispatcher = require('../Dispatcher')
	, ActionsCreator = require('../actions/ActionsCreator')
	, ActionsTypes = require('../../../shared/actions/Constants').Types

	, DispatcherSubscriberMixin = require('../mixins/EventsSubscriberMixin')(Dispatcher);

var User = React.createClass({
	mixins: [DispatcherSubscriberMixin],

	getInitialState: function () {
		return {
			bubbles: false,
			deleting: false
		};
	},
	componentDidMount: function () {
		this.subscribeToEvent(ActionsTypes.DELETING_FRIEND, function (friendId) {
			if (this.props.friendId == friendId)
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

	whisper: function () {
		var chatInput = document.querySelector('.chat-room .chat_text_input');

		chatInput.value = '/w '+this.props.data.name+' ';
		chatInput.focus();
	},
	deleteAsFriend: function () {
		ActionsCreator.deleteFriend(this.props.data._id);
	},

	render: function () {
		var u = this.props.data,
			avatar = u.logo || 'http://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_50x50.png',
			bubbles = null;

		if (this.state.bubbles)
			bubbles = <Bubble key="deleteBubble" onClick={this.deleteAsFriend} className="tp-close-bubble" content="✕" htmlProps={{title: "Delete as friend"}}/>;

		return (
			<div className="tp-user" onClick={this.whisper} onContextMenu={this.toggleBubbles}>
				<div className="tp-online"></div>
				<div className="tp-wrapper" style={{ backgroundImage: 'url(\'' + avatar + '\')', backgroundColor: this.state.deleting ? 'blue' : null }}>
				</div>
				<div className="tp-username">
					{u.name}
				</div>

				{bubbles}
			</div>
		);
	}
});

module.exports = User;