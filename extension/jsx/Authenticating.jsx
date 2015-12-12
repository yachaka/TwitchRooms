
var React = require('react');

var Authenticating = React.createClass({
	
	render: function () {
		return (
			<p className="centered-p status-message">
				Authenticating...
			</p>
		);
	}
});

module.exports = Authenticating;