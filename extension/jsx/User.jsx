
var React = require('react');

var User = React.createClass({

	render: function () {
		var u = this.props.data,
			avatar = u.logo || '';
		return (
			<div className="tp-user">
				<div className="tp-wrapper" style={{ backgroundImage: 'url(\'' + avatar + '\')' }}>
				</div>
				<div className="tp-username">
					{this.props.data.display_name}
				</div>
			</div>
		);
	}
});

module.exports = User;