
var React = require('react');

var Bubble = require('./Bubble.jsx');

var User = React.createClass({

	getInitialState: function () {
		return {
			bubbles: false
		};
	},

	toggleBubbles: function (e) {
		console.log(e.target)
		var b = this.state.bubbles;

		this.setState({
			bubbles: !b
		});
	},

	render: function () {
		var u = this.props.data,
			avatar = u.logo || '',
			bubbles = null;

		if (this.state.bubbles)
			bubbles = <Bubble onClick={this.deleteAsFriend} className="tp-close-bubble" content="✕" htmlProps={{title: "Delete as friend"}}/>;

		return (
			<div className="tp-user" onClick={this.toggleBubbles}>
				<div className="tp-wrapper" style={{ backgroundImage: 'url(\'' + avatar + '\')' }}>
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