/**
 * Definition of the dts.classification object that use device telemetry to 
 * classify a device as basic, standard and full.
 * 
 * Any device is defined as basic, while standard devices provide HTML 4.01 
 * support like cookies, DOM writing, and events. Full devices are those that
 * support AJAX and CSS 3 borders and backgrounds, minimally, but may also 
 * include greater support for HTML 5 technologies. Use dts.capability to get
 * more specific details about device-by-device support.
 * 
 * @author      Eric Bollens
 * @copyright   Copyright (c) 2011-12 UC Regents
 * @license     BSD
 * @version     20120201
 *
 * @requires    dts
 * @requires    dts.screen
 * @requires    dts.capability
 * @see         dts.capability
 */

dts.classification=new function(){

    /**
     * Determine if the device is classified as mobile based on the size of
     * the screen.
     * 
     * @return bool
     */
    this.isMobile = function(){
        return 600 > dts.screen.getHeight()
            && 800  > dts.screen.getWidth();
    }
    
    /**
     * Determine if the device is at least a basic-level device. All devices are
     * of the basic classification.
     * 
     * @return bool
     */ 
    this.isBasic = function(){
        return true;
    }
    
    /**
     * Determine if the device is at least a standard-level device. This 
     * requires that the device has support for DOM writing, AJAX, load event 
     * listener.
     * 
     * @return bool
     */
    this.isStandard = function(){
        return dts.capability.cookie() && dts.capability.write() && dts.capability.events();
    }
    
    /**
     * Determine if the device is a full-level device. This requires that the 
     * device has support for all standard-level features, CSS 2.1 opacity and
     * CSS 3 gradients, border radius and box shadow.
     * 
     * @return bool
     */
    this.isFull = function(){
        return this.isStandard() && dts.capability.ajax() && dts.capability.css3();
    }
    
    /**
     * Returns the string of the top-level classification related to the device.
     * 
     * @return string
     */
    this.get = function(){
        if(this.isFull())
            return 'full';
        else if(this.isStandard())
            return 'standard';
        else
            return 'basic';
    }
};
