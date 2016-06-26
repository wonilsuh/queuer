/**
 *	this class implements a simple queueing mechanism using interval.
 */
"use strict";

import Barn from 'barn';

function runInterval(){
	// console.log('Queuer.runInterval...',this);

	clearInterval(this.intervalId);

	this.intervalId = setInterval(runTask.bind(this), this.interval);

}

function runTask(){
	// console.log('Queuer.runTask...isRunning==='+this.isRunning+', length==='+this.queue.length);

	let length = this.useLocalStorage===true ? this.barn.llen(BARN_KEY) : this.queue.length;
	if(length > 0){
		if(this.isRunning !== true){
			this.isRunning = true;
			var newTask = this.useLocalStorage===true ? this.barn.lpop(BARN_KEY) :this.queue.shift();
			newTask.resolver();
		}
	}else{
		pauseQueue.bind(this)();
	}

}

function pauseQueue(){
	// console.log('Queuer:pauseQueue...');
	clearInterval(this.intervalId);
	this.isRunning = false;
}

const BARN_KEY = 'QUEUER_BARN_KEY'

/**
 *	Class that does queueing magic.
 */
class Queuer{

	/**	@function
	 *	Constructor.
	 *	@param {int} interval - the interval on which Queuer will check for remaining items in the queue.
	 */
	constructor(interval = 10, useLocalStorage = false){
		console.log('Queuer!!!');

		this.interval = interval;
		this.queue = [];
		this.isRunning = false;
		this.intervalId;

		this.useLocalStorage = useLocalStorage;
		if(useLocalStorage===true) this.barn = new Barn();

	}

	/**	@function
	 *	add a new item to the queue and start the queue
	 *	@param {function} func - a function to be run when its turn comes. call next() parameter once it's done.
	 *	@param {boolean} start - should the queue start running? default is true.
	 */
	push(func, start = true){
		// console.log('Queuer.push...', func);

		let toBeAdded = {
			resolver:() => func(()=>{this.isRunning=false;})
		};

		if(this.useLocalStorage===true) this.barn.rpush(BARN_KEY, toBeAdded);
		else queue.push(toBeAdded);

		if(start===true) runInterval.bind(this)();
	}

	/**	@function
	 *	add a new item to the beginning of the queue
	 *	@param {function} func - a function to be run when its turn comes. call next() parameter once it's done.
	 *	@param {boolean} start - should the queue start running? default is true.
	 */
	unshift(func ,start = true){

		let toBeAdded = {
			resolver:() => func(()=>{this.isRunning=false;})
		};

		if(this.useLocalStorage===true) this.barn.lpush(BARN_KEY, toBeAdded);
		else this.queue.unshift(toBeAdded);

		if(start===true) runInterval.bind(this)();
	}

	/**	@function
	 *	pauses the queue after the current task is finihsed
	 */
	pause(){
		pauseQueue.bind(this)();
	}

	/**	@function
	 *	restarts the queue
	 */
	run(){
		runInterval.bind(this)();
	}

}

export default Queuer;
