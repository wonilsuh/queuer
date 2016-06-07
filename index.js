"use strict";

const EventEmitter = require('events');

class Queuer{
	constructor(args){
		console.log('Queuer!!!');
		args = args || {};

		this.queue = [];
		this.isQueueRunning = false;
		this.interval = args.interval || 1;

		this.eventEmitter = new EventEmitter();

	}

	on(){
		this.eventEmitter.on(...arguments);
	}

	push(func, options){
		// console.log('Queuer.push...');
		options = options||{};

		var eventEmitter = new EventEmitter();

		this.queue.push({
			func:func,
			options:options,
			eventEmitter:eventEmitter
		});

		if(options.startNow!==false) this.runQueue();

		return eventEmitter;

	}

	runQueue(){
		// console.log('Queuer.runQueue...'+this.queue.length);
		clearInterval(this.intervalId);
		this.intervalId = setInterval(function(){
			this.runATask();
		}.bind(this),this.interval);
	}

	runATask(){
		if(this.isQueueRunning!==true){
			if(this.queue.length>0){
				// console.log('Queuer.runATask...'+this.queue.length);
				this.isQueueRunning = true;
				var newTask = this.queue.shift();
				newTask.func(function(result){
					this.isQueueRunning = false;
					this.eventEmitter.emit(result===true ? 'TASK-COMPLETE' : 'TASK-FAIL', newTask.options);
					newTask.eventEmitter.emit(result===true ? 'TASK-COMPLETE' : 'TASK-FAIL', newTask.options);
				}.bind(this));
			}else{
				// console.log('Queuer.runATask:done!!!');
				clearInterval(this.intervalId);
				this.isQueueRunning = false;
				this.eventEmitter.emit('ALL-COMPLETE');
			}
		}
	}
}

module.exports = Queuer;