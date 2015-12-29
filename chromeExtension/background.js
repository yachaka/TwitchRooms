
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	switch (request.type) {
		case 'get':
			chrome.storage.sync.get(['accessToken', 'friends'], sendResponse);
			break;
		case 'set':
			chrome.storage.sync.set(request.data, sendResponse);
			break;
		case 'accessTokenChanged':
		console.log('backgrpound page access changed');
			chrome.storage.sync.set({accessToken: request.accessToken}, function () {
				chrome.tabs.query({}, function(tabs) {
					console.log(request.accessToken)
				    var message = {type: 'accessTokenChanged', accessToken: request.accessToken};
				    for (var i = 0; i < tabs.length; ++i) {
				        chrome.tabs.sendMessage(tabs[i].id, message);
				    }
				});
			});
			break;
		// default:
		// 	console.log('others')
		// 	break;
	}
	return true;
});