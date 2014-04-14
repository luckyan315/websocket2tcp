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

    this.ws.on('message', function(data){
      //TODO: on data
      debug('[vnc][onmessage] ' + data);
    });

    this.ws.on('close', function(){
      debug('[vnc][onclose] closed');
    });
    
  };
  
  this.send = function(msg){
    this.ws.send(msg);
  };
  
  //private
  
}).call(VNC.prototype);
