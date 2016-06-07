# queuer

## Introduction

This is a simple queueing mechanism. It uses interval 

## Installation

```
$ npm install simple-queuer;
```

## Usage

```
// require the class
var Queuer = require('simple-queuer')

// instantiate
var queuer = new Queuer({
	interval:1 // if not set, defaults to 1
});

// add event haldner
queuer.on('ALL-COMPLETE', function(){
	// do what ever you do when all tasks are done
});

queuer.on('TASK-COMPLETE', function(options){
	// do what ever you do when a task has been done. The options argument is what was passed to .push() as the second argument.
});

queuer.on('TASK-FAIL', function(options){
	// do what ever you do when a task has failed. The options argument is what was passed to .push() as the second argument.
});

// add tasks. this will automatically start the queue.
queuer.push(
	function(next){
		// do your stuff.
		next(true); // pass true for success, false for fail.
	},
	{
		// pass anything here. this opject will be passed back to the event handler
		...
	}
);

```

## tester.js

```
"use strict";

var Queuer = require('./index.js');
var queuer = new Queuer({
	interval:1
});

// let's log when all tasks are done
queuer.on('ALL-COMPLETE', function(){
	console.log('All completed!');
});

// let's log when each task is done
queuer.on('TASK-COMPLETE', function(options){
	console.log('Task completed: id=='+options.id+', delay=='+options.time);
});

// let's log when each task failed
queuer.on('TASK-FAIL', function(options){
	console.log('Task failed: id=='+options.id+', delay=='+options.time);
});

// let's generate tasks, each with random completion delay
for(let i=0; i<100; i++){

	let delay = Math.round(Math.random() *1000);

	queuer.push(
		// this is the task function
		function(next){
			// let's simulate delays
			setTimeout(function(){
				// let's simulate failures here.
				next(Math.random() > 0.5 ? true : false);
			}, delay);
		},
		// options. pass anything you want.
		{
			id:'task-'+i,
			time:delay
		}
	)
}

```
