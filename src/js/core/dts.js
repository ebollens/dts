/**
 * Definition of the dts base object.
 * 
 * @author      Eric Bollens
 * @copyright   Copyright (c) 2012 UC Regents
 * @license     BSD
 * @version     20120201
 */

var dts = {
    
    execute:function(){
        
        this.has('server') && this.server.write()
        
    },
    
    has:function(name){
        
        return this.hasOwnProperty(name);
        
    }
    
};
