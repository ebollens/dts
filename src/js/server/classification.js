dts.server.classification = new function(){
    
    var cookieName = 'cl';
    
    this.isset = function(){
        
        return dts.server.hasCookie(cookieName);
        
    }
    
    this.write = function(){
        
        var classification = dts.classification;
        dts.server.setCookie(cookieName, (classification.isMobile()?"m":"d")+":"+classification.get().substr(0,1));
        
    }
    
}
    
dts.server.register('classification', dts.server.classification.isset, dts.server.classification.write);