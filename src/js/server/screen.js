dts.server.screen = new function(){
    
    var cookieName = 'scr';
    
    this.isset = function(){
        
        return dts.server.hasCookie(cookieName);
        
    }
    
    this.write = function(){
        
        dts.server.setCookie(cookieName, (dts.screen.getWidth()||-1)+'x'+(dts.screen.getHeight()||-1)+'x'+dts.screen.getPixelRatio());
        
    }
    
}
    
dts.server.register('screen', dts.server.screen.isset, dts.server.screen.write);