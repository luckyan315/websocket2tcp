/**
 * EventEmitter
 *
 * lightweight node.js style Pub/Sub Event Engine for client side
 *
 * Copyright (C) 2014 guanglin.an (lucky315.an@gmail.com)
 * 
 */

"use strict";

function EventEmitter(){
  //reuse previous events while it's exists
  this.$events = this.$events || {};
}


(function(){

  this.emit = function(event){
    if (typeof event !== 'string') throw TypeError('event must be a string');
    if (!this.$events || !this.$events[event]) return;

    for (var i = 0; i < this.$events[event].length; ++i)
    {
      var fn = this.$events[event];
      switch (arguments.length) {
       case 1:
        fn.call(this);
        break;
       case 2:
        fn.call(this, arguments[1]);
        break;
       case 3:
        fn.call(this, arguments[1], arguments[2]);
        break;
      default:
        //slow emitter
        var args = Array.prototype.slice.call(arguments, 1);
        fn.apply(this, args);
      }
      
    }
  };

  this.addListener = function(event, listener){
    if (typeof event !== 'string') throw TypeError('event must be a string!');
    if (typeof listener !== 'function') throw TypeError('listener is needed!');

    this.$events = this.$events || {};
    this.$events[event] = this.$events[event] || [];

    this.$events[event].push(listener);
  };

  this.on = this.addListener;

  this.removeListeners = function(event){
    if (this.$events[event]) {
      delete this.$events[event];
    }
  };
  
}).call(EventEmitter.prototype);

