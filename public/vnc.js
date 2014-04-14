/**
 * a vnc client impl via HTML5 canvas
 *
 * Copyright (C) 2014 guanglin.an (lucky315.an@gmail.com)
 * 
 */

"use strict";

function VNC(){
  EventEmitter.call(this);
};

Utils.inherits(VNC, EventEmitter);

(function(){
  //consts
  var debug = logger.debug;
  
  //public
  this.connect = function(host, port, password, ws_protocol){
    //websocket
    var uri = 'ws://' + host + ':' + port;
    debug('[vnc][connect] uri: ' + uri + ' protocol:' + ws_protocol);

    this.ws = new Ws(uri, ws_protocol);
    this.ws.open();
    
    this.ws.on('connection', function(client){
      //TODO: client connection
      debug('[vnc][onconnection]new client connected...');
    });

    this.ws.on('message', this.handleMessage.bind(this));

    this.ws.on('close', function(){
      //TODO: on close
      debug('[vnc][onclose] closed');
    });

    this.ws.on('error', function(err){
      debug.warn('[vnc][onerror] ' + err);
    });
    
  };
  
  this.send = function(msg){
    if (!this.ws) {
      throw new Error('Pls connect the web socket first, see vnc.connect()');
    }
    this.ws.send(msg);
  };
  
  //private
  this.handleMessage = function(data){
    debug('[vnc][handlMessage] ' + data, this);
  };
  
}).call(VNC.prototype);
