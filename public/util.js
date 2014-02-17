/**
 * utility functions 
 * Copyright (c) 2013, guanglin.an (lucky315.an@gmail.com)
 */

"use strict";

var Utils = {};

(function(){

  this.inherits = function(ctor, superCtor){
    // ctor.prototype = Object.create(superCtor.prototype, {
    //   constructor: {
    //     value: ctor,
    //     enumerable: false,
    //     writable: true,
    //     configurable: true
    //   }
    // });

    function f(){
      this.constructor = ctor;
    }

    f.prototype = superCtor.prototype;
    ctor.prototype = new f();
  };

  //merge property from s (source) to d (destination) 
  this.merge = function(d, s){
    if (typeof s !== 'object') throw TypeError('source(2nd param) must be a object!');
    
    var keys = Object.keys(s);
    var i = keys.length;
    while (i--) {
      d[keys[i]] = s[keys[i]];
    }

    return d;
  };
  
}).call(Utils.prototype);