/**
 * WebSocket wrapper for client side
 * Copyright (C) 2014 guanglin.an (lucky315.an@gmail.com)
 * 
 */

"use strict";

function WebSocket(){
  EventEmitter.call(this);
  
  var websocket = {};
  
}

Utils.inherits(WebSocket, EventEmitter);

(function(){
  //public funcs
  
  this.open = function(uri){
    //TODO:
    
  };

  this.close = function(){
    //TODO:
  };

  this.send = function(msg){
    //TODO:
  };

  // test funcs

  this.init = function(){
    // test log level
    logger.log('this is log!');
    logger.debug('this is debug!');
    logger.info('this is info!');
    logger.warn('this is warn!');
    logger.error('this is error!');

    this.emit('after_init');
  };
  
}).call(WebSocket.prototype);