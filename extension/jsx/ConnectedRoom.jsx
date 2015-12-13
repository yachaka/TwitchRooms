
var React = require('react');

var User = require('./User.jsx')
	, SearchBar = require('./SearchBar.jsx');

var ConnectedRoom = React.createClass({

	getInitialState: function () {

		var users = [];

		for (var i = 0; i < 10; i++) {
			users.push({ display_name: 'wp_yachStyle',
				  _id: 59152099,
				  name: 'wp_yachstyle',
				  type: 'user',
				  bio: null,
				  created_at: '2014-03-18T04:23:48Z',
				  updated_at: '2015-11-13T18:21:39Z',
				  logo: null,
				  _links: { self: 'https://api.twitch.tv/kraken/users/wp_yachstyle' },
				  email: 'ihermellin@hotmail.com',
				  partnered: false,
				  notifications: { push: false, email: true } });
		}
		return {
			users: users
		};
	},

	render: function () {
		return (

			<div id="tp-connectedRoom">
				<SearchBar/>
				<div id="tp-userList">
					{this.state.users.map(function (result) {
						return <User data={result}/>
					})}
				</div>
			</div>
		);
	}
});

module.exports = ConnectedRoom;