/**
 * WebSocket wrapper for client side
 * Copyright (C) 2014 guanglin.an (lucky315.an@gmail.com)
 * 
 */

"use strict";

function Ws(uri, protocol) {
  EventEmitter.call(this);
  
  this.websocket = {};
  /* i.e. ws://127.0.0.1:8888 */
  this.uri = uri;
  /* select a protocol, ('base64' | 'binary') */
  this.protocol = protocol;
  /* received msg queue */
  this.recvQ = [];
  this.init();
}

Utils.inherits(Ws, EventEmitter);

(function(){
  //consts
  var debug = logger.debug;
  
  //public funcs

  this.init = function(){
    debug('init websocket...' + this.uri + ' protocol:' + this.protocol);
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
    debug('[websocket]:' + 'closing websocket connection...');
    this.websocket.close();
  };

  this.send = function(msg){
    //TODO:
    // '>' means msg sent by browser
    debug('> ' + msg);
    this.websocket.send(msg);
  };

  //private funcs
  
  /**
   * A message event recv by websocket server
   * @param {MessageEvent} e 
   */
  this.onmessage = function(e){
    // '<' means recv msg from ws server,
    debug('[onmessage][e.data] ' , e.data);
    //e.data is a ArrayBuffer obj in binary transmission,
    //so use Unit8Array to master(get/set) the msg
    var u8 = new Uint8Array(e.data);

    for(var i = 0; i < u8.length; ++i) {
      this.recvQ.push(u8[i]);
    }
    
    var msg = this.recvQ.map(function(element){
      return String.fromCharCode(element);
    }).join('');

    debug('< ' , msg);
    this.emit('message', msg);
  };

  this.onopen = function(){
    debug('[websocket][onopen]');
    this.emit('connection');
  };

  this.onclose = function(){
    debug('[websocket][onclose]');
    this.emit('close');
  };

  this.onerror = function(err){
    debug('[websocket][onerror]: ' , err);
    this.emit.call(this, 'error', err);
  };
  
}).call(Ws.prototype);