
module.exports = {
	get: function (cb) {
		console.log('chrome config store called')
		chrome.runtime.sendMessage({type: 'get'}, cb);
	}
};