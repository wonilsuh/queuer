# queuer

## Introduction

This is a simple queueing mechanism. It uses interval 

## Installation

```
$ npm install queuer;
```

## Usage

```
// require the class
var Queuer = require('queuer');

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

