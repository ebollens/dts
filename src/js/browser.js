/**
 * Definition of the dts.browser object that provides browser-related telemetry.
 * This information should be used with care, as it may change while the visitor
 * is on the page, as opposed to screen telemetry, which remains constant.
 * 
 * @author      Eric Bollens
 * @copyright   Copyright (c) 2011-12 UC Regents
 * @license     BSD
 * @version     20120130
 *
 * @requires    document
 * @requires    dts
 * @requires    window
 * @see         dts.screen
 */

dts.browser = new function() {
    
    var w = window;
    var d = document;
    
    /**
     * Width of the web browser, or null if it cannot be determined.
     *
     * @return int|null
     */
    this.getWidth = function(){
        return w.innerWidth != null 
            ? w.innerWidth 
            : d.documentElement && d.documentElement.clientWidth 
                ? d.documentElement.clientWidth 
                : d.body != null 
                    ? d.body.clientWidth 
                    : null;
    }
    
    /**
     * Height of the web browser, or null if it cannot be determined.
     *
     * @return int|null
     */
    this.getHeight = function(){
        return  w.innerHeight != null
            ? w.innerHeight 
            : d.documentElement && d.documentElement.clientHeight 
                ?  d.documentElement.clientHeight 
                : d.body != null
                    ? d.body.clientHeight 
                    : null; 
    }
    
    /**
     * Offset from the left of page, or 0 if it cannot be determined.
     * 
     * @return int
     */
    this.posLeft = function(){
        
        return typeof w.pageXOffset != 'undefined' 
            ? w.pageXOffset 
            : d.documentElement && d.documentElement.scrollLeft 
                ? d.documentElement.scrollLeft 
                : d.body.scrollLeft 
                    ? d.body.scrollLeft 
                    : 0;
               
    }
    
    /**
     * Offset from the top of page, or 0 if it cannot be determined.
     * 
     * @return int
     */
    this.posTop = function(){
        return typeof w.pageYOffset != 'undefined' 
            ?  w.pageYOffset 
            : d.documentElement && d.documentElement.scrollTop 
                ? d.documentElement.scrollTop 
                : d.body.scrollTop 
                    ? d.body.scrollTop 
                    : 0;
    }
    
    /**
     * Distance across to the right edge of browser.
     * 
     * @return int
     */
    this.posRight = function(){
        return dts.browser.posLeft() + dts.browser.pageWidth();
    }
    
    /**
     * Distance across to the bottom edge of browser.
     * 
     * @return int
     */
    this.posBottom = function(){
        return this.posTop() + this.pageHeight();
    }
    
    /**
     * Width of the web browser, or null if it cannot be determined.
     *
     * @deprecated 1.2.00
     * @return int|null
     */
    this.pageWidth = this.getWidth;
    
    /**
     * Height of the web browser, or null if it cannot be determined.
     *
     * @deprecated 1.2.00
     * @return int|null
     */
    this.pageHeight = this.getHeight;
    
    /**
     * Return true if browser is running in quirks mode: IE, Moz, Saf, Chrome
     * use "BackCompat" to define quirks mode, while Op uses "QuirksMode".
     * 
     * @return bool
     */
    this.isQuirksMode = function(){
        return document.compatMode == 'BackCompat' || document.compatMode == 'QuirksMode';
    }
    
    /**
     * Return true if browser is running in standards mode.
     * 
     * @return bool
     */
    this.isStandardsMode = function(){
        return !this.isQuirksMode();
    }
    
    /**
     * Return string "standards" or "quirks" from dts.browser.isQuirksMode().
     * 
     * @return "standards"|"quirks"
     */
    this.getMode = function(){
        return this.isQuirksMode() ? "quirks" : "standards";
    }
};