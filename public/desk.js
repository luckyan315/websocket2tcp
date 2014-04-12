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
  
}).call(Desk.prototype);