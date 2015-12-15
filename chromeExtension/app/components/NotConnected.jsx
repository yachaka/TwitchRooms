
var React = require('react');

var NotConnected = React.createClass({
	
	render: function () {
		return (
			<p className="centered-p">
				<button id="connectWithTwitch" onClick={window.connectWithTwitch}><i className="twitch-icon"></i>Connect with Twitch</button>
			</p>
		);
	}
});

module.exports = NotConnected;