
var React = require('react');

var Notification = React.createClass({

	componentDidMount: function () {
		addEventsListener(this.refs.status, 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', this.props.onEnd);
	},

	render: function () {
		var className = "animated fadeOut tp-notification tp-"+this.props.type;

		return (
			<p ref="status" className={className}>{this.props.message}</p>
		);
	}
});

module.exports = Notification;