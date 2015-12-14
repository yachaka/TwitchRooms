
var EventEmitter = require('events').EventEmitter
	, util = require('util');

function Dispatcher() {
	EventEmitter.call(this);
}
util.inherits(Dispatcher, EventEmitter);

module.exports = new Dispatcher();