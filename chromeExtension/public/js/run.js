
waitForElementToDisplay('#right_col .chat-header', 40)
.then(function () {
	
	var h = document.querySelector('#right_col .chat-header');

	httpGet(chrome.extension.getURL('/public/injected.html'))

	.then(function (data) {
		var room = (new DOMParser()).parseFromString(data, 'text/xml').firstChild;
		h.parentNode.insertBefore(room, h.nextSibling);

		ReactDOM.render(
			React.createElement(Room, null),
			document.querySelector('#tp-room')
		);
	});


});