
var React = require('react');

var AddFriendBox = React.createClass({

	getInitialState: function () {
		return {
			pending: false,
			notFound: false
		};
	},
	handleKeyDown: function (e) {
		this.setState({notFound: false});
		if (e.keyCode == 13) {
			this.confirmFriend();
		} else if (e.keyCode == 27) {
			this.props.onCancel();
		}
	},

	confirmFriend: function () {

		this.setState({pending: true});

		httpGet('https://api.twitch.tv/kraken/users/'+this.refs.addFriendInput.value)

		.then(function (data) {
			this.props.onSuccess(JSON.parse(data)._id);
		}.bind(this))
		.error(function (data) {
			this.setState({
				pending: false,
				notFound: true
			});
		}.bind(this));

	},
	render: function () {
		return (
			<div id="tp-addFriendBox">
				<div id="tp-addFriendWrapper">
					{ this.state.notFound == true ? <p className="tp-notification tp-error"> ✕ User not found </p> : null }
					<input autoFocus ref="addFriendInput" id="addFriendInput" onKeyDown={this.handleKeyDown} placeholder="Add friend"/>
					{ this.state.pending == true ? <img id="tp-spinner" src="/img/spinner.gif"/> : null}
				</div>
			</div>
		);
	}

});

module.exports = AddFriendBox;