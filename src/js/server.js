/**
 * Definition of the dts.server object responsible for managing data persistence
 * between telemetry gathered client-side and the server-side application.
 * 
 * @author      Eric Bollens
 * @copyright   Copyright (c) 2011-12 UC Regents
 * @license     BSD
 * @version     20120616
 * 
 * @requires    dts.browser
 * @requires    dts.site
 * 
 * @todo add method-specific documentation for dts.server
 */

dts.server = new function(){
    
    var prefix = 'd_', // do not change without changing DTS_Cookie::PREFIX
        modules = {};
        
    this.loopProtector = 'no_server_init';
    
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
                
                if(!this.isSameOrigin() && !this.isLoopProtected()){
                    
                    window.location = '//'+dts.federation.domain+'/'+dts.federation.script+'?return='+encodeURIComponent(window.location)+'&mode='+dts.browser.getMode();
                  
                }else{
                    
                    modules[module].write();
                    reload = true;
                    
                }
            }
            
        }
        
        if(reload && !this.isLoopProtected()){
            var locArr = window.location.href.split('#'), loc = locArr[0];
            if(loc.indexOf('?') == -1) loc += "?";
            if(loc.indexOf('?') < loc.length-1) loc += "&";
            loc += this.loopProtector;
            locArr[0] = loc;
            window.location = locArr.join('#');
        }
        
    }
    
    this.hasCookie = function(cookieName){
        
        if(this.isSameOrigin()){
            cookieName = prefix+cookieName;
            var cookies = document.cookie.split(/[; ]+/);
            for(var i = 0; i < cookies.length; i++)
                if(cookies[i].substring(0, cookies[i].indexOf('=')) == cookieName)
                    return true;
            return false;
        }else{
            return dts.federation.cookies.indexOf("|"+cookieName+"|") != -1;
        }
        
    }
    
    this.setCookie = function(cookieName, cookieContent){
        
        if(!this.isSameOrigin())
            return false;
        
        document.cookie = prefix + cookieName + '=' + encodeURIComponent(cookieContent)+';path=/';
        
        return true;
        
    }
    
    this.isSameOrigin = function(){
        
        if(typeof dts.federation == 'undefined')
            return true;
        
        return dts.federation.domain == dts.site.getDomain();
    }
    
    this.isLoopProtected = function(){
        return (new RegExp(".*[\?&]"+this.loopProtector+"([\=\&].*)?")).test(window.location.search);
    }
    
};