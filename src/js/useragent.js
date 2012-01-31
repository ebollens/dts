/**
 * Definition of the dts.userAgent object that interprets the browser's user 
 * agent to provide information about the operating system, browser and browser
 * engine.
 * 
 * @author      Eric Bollens
 * @copyright   Copyright (c) 2011-12 UC Regents
 * @license     BSD
 * @version     20120130
 *
 * @uses nagivator.userAgent
 * 
 * @todo refactor and optimize dts.userAgent to better handle more cases
 */

dts.userAgent = new function() {
    
    var userAgent = navigator.userAgent.toLowerCase();
    
    var userAgentSubstringExists = function(s){
        return userAgent.indexOf(s) != -1;
    }
    
    /**
     * Determines the operating system from string or else returns an empty 
     * string.
     *
     * @return string
     */
    this.getOS = function(){ 
        if(userAgent.match(/(iphone)|(ipad)|(ipod)/) != null) 
            return 'iphone_os';
        
        var i = 0,
            osToTest = ['android','blackberry','windows phone os','windows mobile',
                        'symbian','webos','mac os x','windows nt','linux'];
                    
        for(;i<osToTest.length;i++)
            if(userAgentSubstringExists(osToTest[i]))
                return osToTest[i];
        
        return '';
    }
    
    /**
     * Determines the operating system version from string or else returns 
     * an empty string.
     *
     * @return string
     */
    this.getOSVersion = function(){ 
        var ua = userAgent, s, r='';
        switch(this.getOS())
        {
            case 'iphone_os':
                s = ua.indexOf('iphone os')+10;
                r = ua.substring(s, ua.indexOf(' ', s));
            case 'blackberry':
                if(ua.substring(0, 10) == 'blackberry'){
                    s = ua.indexOf('/')+1;
                    r = ua.substring(s, ua.indexOf(' ', s));
                }
                break;
            case 'android':
                if((s = ua.indexOf('android ')) != -1){
                    s += 8;
                    r = ua.substring(s, Math.min(ua.indexOf(' ', s), ua.indexOf(';', s), ua.indexOf('-', s)));
                }
                break;
            case 'windows_phone':
                if((s = ua.indexOf('windows phone os ')) != -1){
                    s += 17;
                    r = ua.substring(s, ua.indexOf(';', s));
                }
                break;
            case 'windows_mobile':
                if((s = ua.indexOf('windows mobile/')) != -1){
                    s += 15;
                    r = ua.substring(s, ua.indexOf(';', s));
                }
                break;
            case 'symbian':
                if((s = ua.indexOf('symbianos/')) != -1){
                    s += 10;
                    r = ua.substring(s, ua.indexOf(';', s));
                }
                else if((s = ua.indexOf('symbian/')) != -1){
                    s += 8;
                    r = "s"+ua.substring(s, ua.indexOf(';', s));
                }
                break;
            case 'webos':
                if((s = ua.indexOf('webos/')) != -1){
                    s += 6;
                    r = ua.substring(s, Math.min(ua.indexOf(';', s)));
                }
                break;
        }
        return r.replace(/\_/g,".");
    }
    
    /**
     * Determines the web browser from string or else returns an empty string.
     *
     * @return string
     */
    this.getBrowser = function(){
        
        if(userAgentSubstringExists('safari'))
            return this.getOS() == 'android' ? 'android_webkit' : 'safari';

        var i = 0,
            browsersToTest = ['chrome','iemobile','camino','seamonkey','firefox','opera_mobi','opera_mini'];
            
        for(;i<browsersToTest.length;i++)
            if(userAgentSubstringExists(browsersToTest[i]))
                return browsersToTest[i];
        
        return '';
    }
    
    /**
     * Determines the web browser engine from string or else returns an empty 
     * string.
     *
     * @return string
     */
    this.getBrowserEngine = function(){
        
        if(userAgentSubstringExists('applewebkit')) 
            return 'webkit';
        
        var i = 0,
            browserEnginesToTest = ['trident','gecko','presto','khtml'];
            
        for(;i<browserEnginesToTest.length;i++)
            if(userAgentSubstringExists(browserEnginesToTest[i])) 
                return browserEnginesToTest[i];
        
        return '';
    }
    
    /**
     * Determines the web browser engine version from string or else returns an 
     * empty string.
     *
     * @return string
     */
    this.getBrowserEngineVersion = function(){
        var ua = userAgent, s;
        var userAgentAfterPatternToSpace = function(p){
            var s = ua.indexOf(p)+p.length;
            return ua.substring(s, Math.min(ua.indexOf(' ',s),ua.indexOf(';',s)));
        }
        switch(this.getBrowserEngine())
        {
            case 'webkit':
                return userAgentAfterPatternToSpace('applewebkit/');
            case 'trident':
                return userAgentAfterPatternToSpace('trident/');
            case 'gecko':
                return userAgentAfterPatternToSpace('gecko/');
            case 'presto':
                s = ua.indexOf('presto/')+7;
                return ua.substring(s, Math.min(ua.indexOf('/', s), ua.indexOf(' ', s), ua.indexOf(')', s)));
        }
        
        return '';
    }
};
