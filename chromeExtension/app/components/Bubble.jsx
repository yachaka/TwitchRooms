
var React = require('react')
	, classNames = require('classnames');

var Bubble = React.createClass({

	render: function () {

		return (
			<div 
				{...this.props.htmlProps}
				className={classNames("tp-bubble bounceIn animated", this.props.className)}
				onClick={this.props.onClick}
				>
				{this.props.content || ''}
			</div>
		);
	}
});

module.exports = Bubble;