/**
 * Definition of the dts.capability object that performs on-demand polling to
 * determine browser capabilities. 
 * 
 * This library leverages Modernizr to accomplish many of its polling functions.
 * However, while dts._Modernizr is directly available, this library should 
 * instead be relied on where possible, as DTS does not guarantee that Modernizr
 * will always be used for capability polling.
 * 
 * @author      Eric Bollens
 * @author      Richard Trott
 * @copyright   Copyright (c) 2011-12 UC Regents
 * @license     BSD
 * @version     20120201
 * 
 * @requires    dts
 * @requires    dts._Modernizr
 * @uses        ActiveXObject
 * @uses        document.addEventListener
 * @uses        document.cookie
 * @uses        document.createElement
 * @uses        document.documentElement
 * @uses        document.write
 * @uses        navigator.cookieEnabled
 * @uses        XMLHttpRequest
 * 
 * @todo        reduce size by consolidating function definitions in loop
 */

dts.capability=new function(){

    /**
     * Local reference to the Modernizr object.
     * 
     * @var object
     */
    var _m = dts._Modernizr;
    
    /**
     * Cached value for AJAX support once determined. If false, then it has not
     * yet been determined. If null, then AJAX is not supported. In all other 
     * cases, this will have been written by dts.capability.ajax as either an
     * XMLHttpRequest or an ActiveXObject, thus indicating AJAX support.
     * 
     * @var false|null|XMLHttpRequest|ActiveXObject
     */
    var _ajax = false;
    
    /**
     * Determine if the device browser supports AJAX. This attempts to create an
     * XHR object of the standard type and ActiveXObject varieties and, if any 
     * succeed, then it returns true. This uses _ajax to cache the result.
     * 
     * @uses _ajax
     * @return bool
     */
    this.ajax = function(){
        if(_ajax === false){
            _ajax = null;
            try { _ajax = new XMLHttpRequest(); } catch (e) {}
            try { _ajax = new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {}
            try { _ajax = new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {}
        }
        return _ajax != null;
    }
    
    /**
     * Determine if the device browser supports application cache (offline web
     * application functionality).
     * 
     * @return bool
     */
    this.applicationcache = _m.test.applicationcache;
    
    /**
     * Determine if the device browser supports HTML 5 audio tag. This is 
     * wrapped as a function given that Modernizr audio() does not always return
     * bool.
     * 
     * @return bool
     */
    this.audio = function(){
        return !! _m.test.audio();
    }
    
    /**
     * Determine if the device browser supports HTML 5 canvas tag.
     * 
     * @return bool
     */
    this.canvas = _m.test.canvas;
    
    /**
     * Cached value for if device browser supports cookies. This is null if it
     * is not yet known if cookies are supported, or a boolean if cookie support
     * has been determined.
     *
     * @var null|bool
     */
    var _cookie = null;
    
    /**
     * Determine if the device browser supports cookies.
     * 
     * @todo implement better document.cookie writing to prevent accidental
     *       assignment to some document.cookie created object - likely, this 
     *       could set expiration time and then check to make sure that it isn't
     *       available by read of document.cookie after being set while the 
     *       cookie name is
     * 
     * @return bool
     */
    this.cookie = function(){
        if(_cookie === null){
            _cookie = (navigator.cookieEnabled && typeof document.cookie != 'undefined') ? true : false
            if (!_cookie){ 
                document.cookie= 'dts';
                _cookie = (document.cookie.indexOf('dts=') != -1) ? true : false;
            }
        }
        return _cookie;
    }
    
    /**
     * Methods that determine CSS support.
     */
    this.css = new function(){
    
        /**
         * Determine if the device browser supports border radius (including 
         * vendor prefixed versions).
         * 
         * @return bool
         */
        this.borderradius = _m.test.borderradius;

        /**
         * Determine if the device browser supports box radius (including 
         * vendor prefixed versions).
         * 
         * @return bool
         */
        this.boxshadow = _m.test.boxshadow;
    
        /**
         * Determine if the device browser supports CSS 3 @font-face.
         * 
         * @return bool
         */
        this.fontface = _m.fontface;

        /**
         * Determine if the device browser supports gradients (including 
         * vendor prefixed versions).
         * 
         * @return bool
         */
        this.gradients = _m.test.cssgradients;
    
        /**
         * Determine if the device browser supports transforms (including 
         * vendor prefixed versions).
         * 
         * @return bool
         */
        this.transforms = function(){
            return _m.test.csstransforms() && _m.test.csstransforms3d();
        }
    
        /**
         * Determine if the device browser supports 2D transforms (including 
         * vendor prefixed versions).
         * 
         * @return bool
         */
        this.transforms2d = _m.test.csstransforms;
    
        /**
         * Determine if the device browser supports 3D transforms (including 
         * vendor prefixed versions).
         * 
         * @return bool
         */
        this.transforms3d = _m.test.csstransforms3d;
        
        /**
         * Determine if the device browser supports transitions (including 
         * vendor prefixed versions).
         * 
         * @return bool
         */
        this.transitions = _m.test.csstransitions;
    
        /**
         * Determine if the device browser supports a particular property.
         * 
         * @return bool
         */
        this.prop = _m.test.testProp;
    
    }
    
    /**
     * Determine if the device browser supports the simplest CSS 3 properties,
     * namely border radius, box shadow and gradients.
     *
     * @return bool
     */
    this.css3 = function(){
        return this.css.borderradius() && this.css.boxshadow() && this.css.gradients()
    }
    
    /**
     * Determine if the device browser supports HTML 5 drag and drop.
     * 
     * @return bool
     */
    this.draganddrop = _m.test.draganddrop;
    
    /**
     * Determine if the device browser supports events with .addEventListener().
     * 
     * @return bool
     */
    this.events = function(){
        var el = document.createElement('div');
        var isSupported = (typeof document.addEventListener == 'function');
        el = null;
        return isSupported;
    }
    
    /**
     * Determine if the device browser supports a particular event.
     * 
     * @return bool
     */
    this.event = _m.hasEvent;
    
    /**
     * Determine if the device browser supports inline SVG.
     * 
     * @return bool
     */
    this.inlinesvg = _m.test.inlinesvg;
    
    /**
     * Determine if the device browser supports the DOM localStorage object and
     * associated local storage API.
     * 
     * @return bool
     */
    this.localstorage = _m.test.localstorage;
    
    /**
     * Determine if the device browser supports the DOM sessionStorage object
     * and associated session storage API.
     * 
     * @return bool
     */
    this.sessionstorage = _m.test.sessionstorage;
    
    /**
     * Determine if the device browser supports SVG.
     * 
     * @return bool
     */
    this.svg = _m.test.svg;
    
    /**
     * Determine if device supports touch events.
     * 
     * @return bool
     */
    this.touch = _m.test.touch;
    
    /**
     * Determine if the device browser supports HTML 5 video tag. This is 
     * wrapped as a function given that Modernizr audio() does not always return
     * bool.
     * 
     * @return bool
     */
    this.video = function(){
        return !! _m.test.video;
    }
    
    /**
     * Determine if the device browser supports web sockets.
     * 
     * @return bool
     */
    this.websockets = _m.test.websockets;
    
    /**
     * Determine if the device browser supports live writes to the DOM.
     * 
     * @return bool
     */
    this.write = function(){
        document.documentElement.className += " dts ";
        return (" " + document.documentElement.className + " ").replace(/[\n\t]/g, " ").indexOf(" dts ") > -1
    }
};
