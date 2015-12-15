
var React = require('react');

var Authenticating = React.createClass({
	
	render: function () {
		return (
			<p className="tp-centered-p tp-status-message">
				Authenticating...
			</p>
		);
	}
});

module.exports = Authenticating;