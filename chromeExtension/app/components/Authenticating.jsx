
var React = require('react');

var DisabledTopBar = require('./DisabledTopBar.jsx')

var Authenticating = React.createClass({
	
	render: function () {
		return (
			<div id="tp-authenticating" className="tp-bottom-section tp-no-top-bar tp-status-message">
				Authenticating to TwitchPlus...
			</div>
		);
	}
});

module.exports = Authenticating;