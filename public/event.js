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

  this.emit = function(){
    
  };

  this.addListener = function(){
    
  };

  this.on = this.addListener;

  this.removeListener = function(){
    
  };
  
}).call(EventEmitter.prototype);