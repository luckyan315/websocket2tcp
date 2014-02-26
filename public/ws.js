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
    this.websocket.binaryType = 'arraybuffer';
    
    //register listeners
    this.websocket.onmessage = this.onmessage.bind(this);
    this.websocket.onopen = this.onopen.bind(this);
    this.websocket.onclose = this.onclose.bind(this);
    this.websocket.onerror = this.onerror.bind(this);
  };

  this.close = function(){
    //TODO:
    logger.debug('[websocket]:' + 'closing websocket connection...');
    this.websocket.close();
  };

  this.send = function(msg){
    //TODO:
    // '>' means msg sent by browser
    logger.debug('> ' + msg);
    this.websocket.send(msg);
  };

  //private funcs
  
  /**
   * A message event recv by websocket server
   * @param {MessageEvent} e 
   */
  this.onmessage = function(e){
    // '<' means recv msg from ws server,
    var u8 = new Uint8Array(e.data);
    var msgQ = [];
    for(var i = 0; i < u8.length; ++i) {
      msgQ.push(u8[i]);
    }
    
    var msg = msgQ.map(function(element){
      return String.fromCharCode(element);
    }).join('');

    logger.debug('< ' , msg);
    this.emit('message', msg);
  };

  this.onopen = function(){
    logger.debug('[websocket][onopen]');
    this.emit('connection');
  };

  this.onclose = function(){
    logger.debug('[websocket][onclose]');
    this.emit('close');
  };

  this.onerror = function(err){
    logger.debug('[websocket][onerror]: ' , err);
    this.emit.call(this, 'error', err);
  };
  
}).call(Ws.prototype);