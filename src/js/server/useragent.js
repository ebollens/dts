dts.server.userAgent = new function(){
    
    var cookieName = 'ua';
    
    this.isset = function(){
        
        return dts.server.hasCookie(cookieName);
        
    }
    
    /**
     * @todo minimize this payload size
     */
    this.write = function(){
        
        var userAgent = dts.userAgent,
            cookieValue = "|",
            tmp,
            fns = {'getOS':'o',
                   'getOSVersion':'ov',
                   'getBrowser':'b',
                   'getBrowserEngine':'e',
                   'getBrowserEngineVersion':'ev'};
                     
        for(var fn in fns){
            if(userAgent.hasOwnProperty(fn)){
                if(tmp=userAgent[fn]())
                    cookieValue += fns[fn]+":"+tmp+"|";
            }
        }
        
        dts.server.setCookie(cookieName, cookieValue);
        
    }
    
}
    
dts.server.register('userAgent', dts.server.userAgent.isset, dts.server.userAgent.write);