
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
			if (this.props.data._id == friendId)
				this.setState({deleting: true});
		}.bind(this));
	},
	toggleBubbles: function (e) {
		console.log(e.target)
		var b = this.state.bubbles;

		this.setState({
			bubbles: !b
		});
	},

	deleteAsFriend: function () {
		ActionsCreator.deleteFriend(this.props.data._id);
	},

	render: function () {
		var u = this.props.data,
			avatar = u.logo || '',
			bubbles = null;

		if (this.state.bubbles)
			bubbles = <Bubble onClick={this.deleteAsFriend} className="tp-close-bubble" content="✕" htmlProps={{title: "Delete as friend"}}/>;

		return (
			<div className="tp-user" onClick={this.toggleBubbles}>
				<div className="tp-wrapper" style={{ backgroundImage: 'url(\'' + avatar + '\')', backgroundColor: this.state.deleting ? 'blue' : null }}>
				</div>
				<div className="tp-username">
					{this.props.data.display_name}
				</div>

				{bubbles}
			</div>
		);
	}
});

module.exports = User;