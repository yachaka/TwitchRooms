
module.exports = {
	get: function (cb) {
		cb({
			accessToken: localStorage.getItem("accessToken"),
			friends: JSON.parse(localStorage.getItem("friends"))
		});
	}
};