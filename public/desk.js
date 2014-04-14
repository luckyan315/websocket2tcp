/**
 * a lightweight desktop impl as a vnc client 
 *
 * Copyright (C) 2014 guanglin.an (lucky315.an@gmail.com)
 * 
 */

"use strict";

function Desk(){
  EventEmitter.call(this);
  
}

Utils.inherits(Desk, EventEmitter);

(function(){

  //public funcs
  this.init = function(cb){
    //TODO: 
    if (cb && typeof cb !== 'function') {
      throw TypeError('need callback func');
    }

    //vnc client obj use html5 canvas
    this.vnc = new VNC();
    
    cb && cb();
    // this.emit('init');
  };

  this.connect = function(){

    var host = document.getElementById('host').value;
    var port = document.getElementById('port').value;
    var password = document.getElementById('password').value;
    var ws_protocol = 'binary';
    
    if ((!host) || (!port)) {
    throw new Error('Host and Port Must be set!');
    }

    this.vnc.connect(host, port, password, ws_protocol);
  };

  this.send = function(msg){
    //TODO:
    this.vnc.send(msg);
  };
  
}).call(Desk.prototype);