
var React = require('react');

var Notification = require('./common/Notification.jsx')
	, AddFriendBox = require('./AddFriendBox.jsx');

var TopBar = React.createClass({
	
	getInitialState: function () {
		return {
			showAddBox: true,
			notification: null
		};
	},
	
	toggleInput: function () {
		var b = !this.state.showAddBox;

		this.setState({
			showAddBox: !this.state.showAddBox
		});

		if (b == true)
			this.setState({notification: null});
	},


	addFriend: function (friendId) {
		console.log('Friend ID:', friendId);
		this.setState({
			showAddBox: false,
			notification: {
				msg: ' ✓ Friend added',
				type: 'success'
			}
		});

		var friends = getCookie('friends') || [];
		friends.push(friendId);
		friends.filter(function(value, index, self) {return self.indexOf(value) === index;});

		createCookie('friends', JSON.stringify(friends), 31);
	},
	render: function () {
		var ahead = null;

		if (this.state.showAddBox)
			ahead = <AddFriendBox onSuccess={this.addFriend} onCancel={this.toggleInput}/>;
		else if (this.state.notification)
			ahead = <Notification type={this.state.notification.type} message={this.state.notification.msg} onEnd={() => { this.setState({notification: null}); } }/>
		return (
			<div id="tp-top">
				<div id="tp-topBar">
					{ ahead }
					<img src="/img/plus-icon.png" title="Mark a friend" onClick={this.toggleInput}/>
				</div>
			</div>
		);
	}

});

module.exports = TopBar;