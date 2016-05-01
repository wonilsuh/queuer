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