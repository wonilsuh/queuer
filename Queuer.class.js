/**
 *	this class implements a simple queueing mechanism using interval.
 */
"use strict";

function runInterval(){
	// console.log('Queuer.runInterval...',this);

	clearInterval(this.intervalId);

	this.intervalId = setInterval(runTask.bind(this), this.interval);

}

function runTask(){
	// console.log('Queuer.runTask...isRunning==='+this.isRunning+', length==='+this.queue.length);

	if(this.queue.length > 0){
		if(this.isRunning !== true){
			this.isRunning = true;
			let newTask = this.queue.shift();
			console.log(newTask);
			newTask.resolver();
		}
	}else{
		this.isRunning = false;
		clearInterval(this.intervalId);
	}

}

/**
 *	Class that does queueing magic.
 */
class Queuer{

	/**	@function
	 *	Constructor.
	 *	@param {int} interval - the interval on which Queuer will check for remaining items in the queue.
	 */
	constructor(interval = 10){
		// console.log('Queuer!!!');

		this.interval = interval;
		this.queue = [];
		this.isRunning = false;
		this.intervalId;

	}

	/**	@function
	 *	add a new item to the queue and start the queue
	 *	@param {function} func - a function to be run when its turn comes. call next() parameter once it's done.
	 */
	push(func){
		// console.log('Queuer.push...', func);
		this.queue.push({
			resolver:() => func(()=>{this.isRunning=false;})
		});

		runInterval.bind(this)();
	}

}

export default Queuer;