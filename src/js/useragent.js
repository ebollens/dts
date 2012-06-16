/**
 * Definition of the dts.userAgent object that interprets the browser's user 
 * agent to provide information about the operating system, browser and browser
 * engine.
 * 
 * @author      Eric Bollens
 * @author      Richard Trott
 * @copyright   Copyright (c) 2011-12 UC Regents
 * @license     BSD
 * @version     20120616
 *
 * @uses nagivator.userAgent
 * 
 * @todo refactor and optimize dts.userAgent to better handle more cases
 */

dts.userAgent = new function(optionalUAString) {
    
    var uaString = typeof optionalUAString === 'undefined' ? navigator.userAgent : optionalUAString;
    var userAgent = uaString.toLowerCase();
    
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
        osToTest = ['android','blackberry','windows phone os',
            'symbian','webos','mac os x','windows nt','linux'];
                    
        for(;i<osToTest.length;i++)
            if(userAgentSubstringExists(osToTest[i]))
                return osToTest[i].replace(/ /g,"_");
        
        return '';
    }
    
    /**
     * Determines the operating system version from string or else returns 
     * an empty string.
     *
     * @return string
     */
    this.getOSVersion = function(){ 
        var ua = userAgent, s, r='', x;
        switch(this.getOS())
        {
            case 'iphone_os':
                x = ua.match(/(iphone|cpu) os ([\d_]+)/);
                if (x!=null) 
                    r = x[2];
                break;
            case 'blackberry':
                x = ua.match(/^mozilla\/5\.0 \(blackberry;.* version\/([\d\.]+)/);
                if (x!=null) {
                    r = x[1];
                    break;
                }else if(ua.substring(0, 10) == 'blackberry'){
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
            case 'windows_phone_os':
                if((s = ua.indexOf('windows phone os ')) != -1){
                    s += 17;
                    r = ua.substring(s, ua.indexOf(';', s));
                }
                break;
            case 'symbian':
                x = ua.match(/symbianos\/([\d\.]+)/);
                if (x!=null) 
                    r = x[1];
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

        var i,
        browsersToTest = ['chrome','iemobile','camino','seamonkey','firefox','opera mobi','opera mini'];
            
        for(i=0;i<browsersToTest.length;i++)
            if(userAgentSubstringExists(browsersToTest[i]))
                return browsersToTest[i].replace(/ /g,"_");
        
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
        browserEnginesToTest = ['trident','gecko','presto'];
            
        for(;i<browserEnginesToTest.length;i++)
            if(userAgentSubstringExists(browserEnginesToTest[i])) 
                return browserEnginesToTest[i];
        
        return '';
    }
};
