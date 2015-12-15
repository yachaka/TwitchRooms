
var React = require('react');

var ActionsCreator = require('../actions/ActionsCreator');

var AddFriendBox = React.createClass({

	_initialState: {
		pending: false,
		notFound: false
	},
	getInitialState: function () {
		return this._initialState;
	},
	handleKeyDown: function (e) {
		this.setState({pending: false, notFound: false});
		if (e.keyCode == 13) {
			this.addFriend();
		} else if (e.keyCode == 27) {
			this.props.onCancel();
		}
	},

	addFriend: function () {

		this.setState({pending: true});

		httpGet('https://api.twitch.tv/kraken/users/'+this.refs.addFriendInput.value)

		.then(function (data) {
			var data = JSON.parse(data);
			this.setState(this._initialState);
			ActionsCreator.addFriend(data._id);
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