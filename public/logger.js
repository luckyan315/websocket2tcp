/**
 * common logger module 
 * Copyright (C) 2014 guanglin.an (lucky315.an@gmail.com)
 * 
 */

"use strict";

var logger = {};

logger.init = function(level){
  logger.debug = logger.log = logger.info = logger.warn = logger.error = function(msg) {};

  Array.prototype.shift.call(arguments);
  switch(level){
    case 'debug': logger.debug = function(){ console.log.apply(console, arguments);};
    case 'log': logger.log = function(){ console.log.apply(console, arguments);};
    case 'info': logger.info = function(){ console.info.apply(console, arguments);};
    case 'warn': logger.warn = function(){ console.warn.apply(console, arguments);};
    case 'error': logger.error = function(){ console.error.apply(console, arguments);};
    case 'quiet':
    break;
    default: throw new Error('Undefined log level');
  };

};

logger.init('debug');