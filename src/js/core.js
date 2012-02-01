/**
 * Core definition of the dts object.
 * 
 * @author      Eric Bollens
 * @copyright   Copyright (c) 2012 UC Regents
 * @license     BSD
 * @version     20120201
 */

var dts = {execute:function(){typeof this.server != 'undefined' && this.server.write()}};