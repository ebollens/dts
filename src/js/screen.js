/**
 * Definition of the dts.screen object that provides screen-related telemetry.
 * 
 * @author      Eric Bollens
 * @author      Richard Trott
 * @copyright   Copyright (c) 2011-12 UC Regents
 * @license     BSD
 * @version     20120130
 *
 * @requires    dts
 * @requires    dts.browser
 * @requires    dts.userAgent
 * @uses        window.screen
 * @uses        window.devicePixelRatio
 */

dts.screen = new function() {
    
    var ws = window.screen;
    
    /**
     * Bug in Android 2.2-2.3, 4.0 prevents it from returning accurate screen 
     * dimensions, so bypass inaccurate values with false instead.
     * 
     * @compat Android 2.2-2.2, 4.0
     */
    var version = dts.userAgent.getOSVersion();
    if(dts.userAgent.getOS() == 'android' && (version.indexOf('2.2') == 0 || version.indexOf('2.3') == 0 || version.indexOf('4.0'))) {
        ws = {width:false,height:false}
    }
    
    /**
     * Determine device screen width.
     * 
     * @return int|bool
     */
    this.getWidth=function(){
        return typeof ws.width !== 'undefined'
            ? ws.width 
            : dts.browser.getWidth(); 
    }
    
    /**
     * Determine device screen height.
     * 
     * @return int|bool
     */
    this.getHeight=function(){
        return typeof ws.height !== 'undefined'
            ? ws.height 
            : dts.browser.getHeight();
    }
    
    /**
     * Determine device screen pixel ratio.
     * 
     * @return float
     */
    this.getPixelRatio=function(){
        return (typeof window.devicePixelRatio != 'undefined' && window.devicePixelRatio)
            ? window.devicePixelRatio
            : 1;
    }
};