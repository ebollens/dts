/**
 * Execution event attacher for onLoad.
 * 
 * @author      Eric Bollens
 * @copyright   Copyright (c) 2012 UC Regents
 * @license     BSD
 * @version     20120201
 */

/**
 * Add an event listener to execute the DTS.
 * 
 * @todo can we do this any earlier in the routine?
 */
if(window.addEventListener)
    window.addEventListener('load',function(){
        dts.execute();
    },false);
else if(window.attachEvent)
    window.attachEvent('onload',function(){
        dts.execute();
    });