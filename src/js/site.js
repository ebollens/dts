/**
 * Definition of the dts.site object that provides site-related utility.
 * 
 * @author      Eric Bollens
 * @copyright   Copyright (c) 2011-12 UC Regents
 * @license     BSD
 * @version     20120131
 *
 * @uses document.URL
 */

dts.site = {
    
    /**
     * Returns domain of the current page with scheme, port and path removed.
     * 
     * @return string
     */
    
    getDomain:function(){
        
        var p = document.URL, i;
        
        if((i = p.indexOf('://')) !== false)
            p = p.substring(i+3);
        else if((i = p.indexOf('//')) === 0)
            p = p.substring(2);

        if((i = p.indexOf('/')) > -1)
            p = p.substring(0, i);

        if((i = p.indexOf(':')) > -1)
            p = p.substring(0, i);

        if((i = p.indexOf('.')) == 0)
            p = p.substring(1);

        return p;
        
    }
    
};