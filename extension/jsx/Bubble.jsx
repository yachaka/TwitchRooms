
var React = require('react')
	, classNames = require('classnames');

var Bubble = React.createClass({

	bubbleClicked: function (e) {
		this.props.onClick();
	},

	render: function () {

		return (
			<div 
				{...this.props.htmlProps}
				className={classNames("tp-bubble bounceIn animated", this.props.className)}
				onClick={this.bubbleClicked}
				>
				{this.props.content}
			</div>
		);
	}
});

module.exports = Bubble;