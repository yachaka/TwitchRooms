
var React = require('react');

var DisabledTopBar = React.createClass({

	render: function () {
		return (
			<div id="tp-top">
				<div id="tp-topBar">
					<img id="tp-addAFriend" className="disabled" src={ chrome && chrome.extension ? chrome.extension.getURL('/public/img/plus-icon.png') : '/img/plus-icon.png'}/>
				</div>
			</div>
		);
	}
});

module.exports = DisabledTopBar;