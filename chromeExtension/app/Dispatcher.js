
var EventEmitter2 = require('eventemitter2').EventEmitter2
	, util = require('util');

function Dispatcher() {
	EventEmitter2.call(this, {
		maxListeners: 100
	});
}
util.inherits(Dispatcher, EventEmitter2);

module.exports = new Dispatcher();