/**
 * WebSocket wrapper for client side
 * Copyright (C) 2014 guanglin.an (lucky315.an@gmail.com)
 * 
 */

"use strict";

function Ws(uri, protocol){
  EventEmitter.call(this);
  
  this.websocket = {};
  /* i.e. ws://127.0.0.1:8888 */
  this.uri = uri;
  /* select a protocol, ('base64' | 'binary') */
  this.protocol = protocol;

  this.init();
}

Utils.inherits(Ws, EventEmitter);

(function(){
  //public funcs

  this.init = function(){
    logger.debug('init websocket...');
  };
  
  this.open = function(){
    //TODO:
    this.websocket = new WebSocket(this.uri, this.protocol);

    //register listeners
    this.websocket.onmessage = this.onmessage.bind(this);
    this.websocket.onopen = this.onopen.bind(this);
    this.websocket.onclose = this.onclose.bind(this);
    this.websocket.onerror = this.onerror.bind(this);
  };

  this.close = function(){
    //TODO:
  };

  this.send = function(msg){
    //TODO:
  };

  //private funcs
  this.onmessage = function(msg){
    // '<' means msg recv,  '>' means msg sent 
    logger.debug('< ' + msg);
  };

  this.onopen = function(){
    logger.debug('[websocket][onopen]');
  };

  this.onclose = function(){
    logger.debug('[websocket][onclose]');
  };

  this.onerror = function(err){
    logger.debug('[websocket][onerror]: ' , err);
  };
  
}).call(Ws.prototype);