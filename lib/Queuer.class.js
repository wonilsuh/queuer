/**
 *	this class implements a simple queueing mechanism using interval.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function runInterval() {
	// console.log('Queuer.runInterval...',this);

	clearInterval(this.intervalId);

	this.intervalId = setInterval(runTask.bind(this), this.interval);
}

function runTask() {
	// console.log('Queuer.runTask...isRunning==='+this.isRunning+', length==='+this.queue.length);

	if (this.queue.length > 0) {
		if (this.isRunning !== true) {
			this.isRunning = true;
			var newTask = this.queue.shift();
			newTask.resolver();
		}
	} else {
		pauseQueue.bind(this)();
	}
}

function pauseQueue() {
	// console.log('Queuer:pauseQueue...');
	clearInterval(this.intervalId);
	this.isRunning = false;
}

/**
 *	Class that does queueing magic.
 */

var Queuer = function () {

	/**	@function
  *	Constructor.
  *	@param {int} interval - the interval on which Queuer will check for remaining items in the queue.
  */

	function Queuer() {
		var interval = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];

		_classCallCheck(this, Queuer);

		console.log('Queuer!!!');

		this.interval = interval;
		this.queue = [];
		this.isRunning = false;
		this.intervalId;
	}

	/**	@function
  *	add a new item to the queue and start the queue
  *	@param {function} func - a function to be run when its turn comes. call next() parameter once it's done.
  *	@param {boolean} start - should the queue start running? default is true.
  */


	_createClass(Queuer, [{
		key: "push",
		value: function push(func) {
			var _this = this;

			var start = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

			// console.log('Queuer.push...', func);
			this.queue.push({
				resolver: function resolver() {
					return func(function () {
						_this.isRunning = false;
					});
				}
			});

			if (start === true) runInterval.bind(this)();
		}

		/**	@function
   *	add a new item to the beginning of the queue
   *	@param {function} func - a function to be run when its turn comes. call next() parameter once it's done.
   *	@param {boolean} start - should the queue start running? default is true.
   */

	}, {
		key: "unshift",
		value: function unshift(func) {
			var _this2 = this;

			var start = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

			this.queue.unshift({
				resolver: function resolver() {
					return func(function () {
						_this2.isRunning = false;
					});
				}
			});

			if (start === true) runInterval.bind(this)();
		}

		/**	@function
   *	pauses the queue after the current task is finihsed
   */

	}, {
		key: "pause",
		value: function pause() {
			pauseQueue.bind(this)();
		}

		/**	@function
   *	restarts the queue
   */

	}, {
		key: "run",
		value: function run() {
			runInterval.bind(this)();
		}
	}]);

	return Queuer;
}();

exports.default = Queuer;