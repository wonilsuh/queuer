# queuer

## Introduction

This is a simple queueing mechanism.

## Installation

```
$ npm install queuer;
```

## Usage

```
var Queuer = require('queuer');
var queuer = new Queuer();
queuer.push(function(next){
  // do your stuff.
  next(true); // pass true for success, false for fail.
});

