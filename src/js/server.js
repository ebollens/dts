/**
 * Definition of the dst.server object responsible for managing data persistence
 * between telemetry gathered client-side and the server-side application.
 * 
 * @author      Eric Bollens
 * @copyright   Copyright (c) 2011-12 UC Regents
 * @license     BSD
 * @version     20120131
 * 
 * @requires    dts.browser
 * @requires    dts.site
 * 
 * @todo add method-specific documentation for dts.server
 */

dts.server = new function(){
    
    var modules = {};
    
    this.savePath = false;
    
    this.register = function(module, testCallback, writeCallback){
        
        modules[module] = {'test':testCallback, 'write':writeCallback};
        
    }
    
    this.registered = function(module){
        
        return modules.hasOwnProperty(module);
        
    }
    
    this.test = function(module){
        
        return this.registered(module) ? modules[module].test() : null;
        
    }
    
    this.write = function(){
        
        var reload = false;
        
        for(var module in modules){
            
            if(this.test(module) === false){
                
                if(!this.isSameOrigin()){
                    
                    window.location = '//'+dts.federation.domain+'/'+dts.federation.script+'?return='+encodeURIComponent(window.location)+'&mode='+dts.browser.getMode();
                  
                }else{
                    
                    modules[module].write();
                    reload = true;
                    
                }
            }
            
        }
        
        if(reload)
            document.location.reload();
        
    }
    
    this.isSameOrigin = function(){
        
        if(typeof dts.federation.domain == 'undefined')
            return true;
        
        return dts.federation.domain == dts.site.getDomain();
    }
    
};