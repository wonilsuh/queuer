"use strict";

class Queuer{
	constructor(args){
		console.log('Queuer!!!');
		args = args || {};

		this.queue = [];
		this.isQueueRunning = false;
		this.interval = args.interval || 50;
	}

	push(func){
		// console.log('Queuer.push...');
		this.queue.push(func);

		this.runQueue();
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
				newTask(function(){
					this.isQueueRunning = false;
				}.bind(this));
			}else{
				// console.log('Queuer.runATask:done!!!');
				clearInterval(this.intervalId);
				this.isQueueRunning = false;
			}
		}
	}
}

module.exports = Queuer;