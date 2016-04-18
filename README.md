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
  interval:1 // if not set, defaults to 50
});

// add tasks. this will automatically start the queue.
queuer.push(function(next){
  // do your stuff.
  next(true); // pass true for success, false for fail.
});

