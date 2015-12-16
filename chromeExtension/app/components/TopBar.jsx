
var React = require('react');

var Notification = require('./common/Notification.jsx')
	, AddFriendBox = require('./AddFriendBox.jsx')

	, Dispatcher = require('../Dispatcher')
	, ActionsCreator = require('../actions/ActionsCreator')
	, ActionsTypes = require('../../../shared/actions/Constants').Types

	, DispatcherSubscriberMixin = require('../mixins/EventsSubscriberMixin')(Dispatcher);

var TopBar = React.createClass({
	mixins: [DispatcherSubscriberMixin],

	getInitialState: function () {
		return {
			showAddBox: false,
			notification: null
		};
	},
	componentWillMount: function () {
		this.subscribeToEvent(ActionsTypes.FRIEND_ADDED,
			function () {
				this.setState({
					showAddBox: false,
					notification: {
						msg: ' ✓ Friend added',
						type: 'success'
					}
				});
			}.bind(this)
		);
	},

	toggleInput: function () {
		var b = !this.state.showAddBox;

		this.setState({
			showAddBox: !this.state.showAddBox
		});

		if (b == true)
			this.setState({notification: null});
	},


	
	render: function () {
		var ahead = null, plusClassName = this.state.showAddBox ? 'active' : '';

		if (this.state.showAddBox)
			ahead = <AddFriendBox onSuccess={this.addFriend} onCancel={this.toggleInput}/>;
		else if (this.state.notification)
			ahead = <Notification type={this.state.notification.type} message={this.state.notification.msg} onEnd={() => { this.setState({notification: null}); } }/>
		return (
			<div id="tp-top">
				<div id="tp-topBar">
					{ ahead }
					<img id="tp-addAFriend" className={plusClassName} src={ chrome && chrome.extension ? chrome.extension.getURL('/public/img/plus-icon.png') : '/img/plus-icon.png'} title="Add a friend" onClick={this.toggleInput}/>
				</div>
			</div>
		);
	}

});

module.exports = TopBar;