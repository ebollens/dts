<?php

/**
 * Class definition for DTS_Dependency.
 * 
 * @package     DTS
 * @author      Eric Bollens
 * @copyright   Copyright (c) 2012 UC Regents
 * @license     BSD
 * @version     20120201
 */

/**
 * A static class that provides information on DTS library dependencies. This is
 * used by the DTS class
 * 
 * @package     DTS
 * @see         DTS
 */
class DTS_Dependency
{
    /**
     * Container of dependencies where the key is the name of the file with
     * dependencies and the value is an array of dependencies.
     * 
     * @var array string=>array(string) 
     */
    private static $_dependencies = array(
        'capability.js'             =>  array('modernizr.js'),
        'classification.js'         =>  array('screen.js', 'capability.js'),
        'screen.js'                 =>  array('userAgent.js', 'browser.js'),
        'server/screen.js'          =>  array('server.js', 'screen.js'),
        'server/useragent.js'       =>  array('server.js', 'useragent.js'),
        'server/classification.js'  =>  array('server.js', 'classification.js'),
        'server.js'                 =>  array('site.js', 'browser.js'),
        'federation.php'            =>  array('server.js')
    );
    
    /**
     * Get an array of dependencies for file by $name or false if none exist.
     * 
     * @param string $name
     * @return array|false 
     */
    public static function get($name)
    {
        return array_key_exists($name, self::$_dependencies) ? self::$_dependencies[$name] : false;
    }
}