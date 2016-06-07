# queuer

## Introduction

This is a simple queueing mechanism. It uses interval to check remaining items in the queue. Uses es2015 syntaxes.

## Installation

```
$ npm install --save simple-queuer;
```

## Usage

```
// require the class
import Queuer from 'simple-queuer';

// instantiate
var queuer = new Queuer(10); // the default value is 10.

// add tasks. this will automatically start the queue.
queuer.push(
	function(next){
		setTimeout(()=>{next()}, 1000);
	}
);

```
