
var React = require('react');

var SearchBar = React.createClass({
	
	render: function () {

		return (
			<div id="tp-searchBar">
				<input type="text" placeholder="Search for users watching the stream"/>
			</div>
		);
	}

});

module.exports = SearchBar;