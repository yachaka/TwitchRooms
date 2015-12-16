
var React = require('react');

var DisabledTopBar = require('./DisabledTopBar.jsx');

var NotConnected = React.createClass({
	
	render: function () {
		return (
			<div id="tp-notConnected" className="tp-bottom-section tp-no-top-bar">
				<button id="tp-connectWithTwitch" onClick={window.connectWithTwitch}><img className="tp-twitch-icon" src={ chrome && chrome.extension ? chrome.extension.getURL('/public/img/twitch-logo.svg') : '/img/twitch-logo.svg'} /> Connect with Twitch</button>
			</div>
		);
	}
});

module.exports = NotConnected;